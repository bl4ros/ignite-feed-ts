import React from "react";
import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface Content {
  type: "paragraph" | "link";
  content: string;
}

interface PostType {
  author: {
    avatarUrl: string;
    name: string;
    role: string;
  };
  publishedAt: Date;
  content: {
    type: string;
    content: string;
  }[];
}

export function Post({ author, publishedAt, content }: PostType) {
  const [comments, setComments] = React.useState(["Post muito bacana ein?!"]);
  const [newCommentText, setNewCommentText] = React.useState("");

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleNewCommentChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleCreateNewComment(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentInvalid(
    event: React.InvalidEvent<HTMLTextAreaElement>
  ) {
    event.target.setCustomValidity("This field is invalid");
  }

  function deleteComment(commentToDelete: string) {
    /* Nomear funções que serão executadas apartir de uma ação do usuário com on essa função será passada para outro component
     */
    const commentWithoutDeletedOne = comments.filter(
      (commentCandidate) => commentToDelete !== commentCandidate
    );

    //imutabilidade -> as variáveis não sofrem mutação, nós criamos um novo valor (um novo espaço na memória)
    setComments(commentWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
          return;
        })}
      </div>

      <form
        className={styles.commentForm}
        onSubmit={() => handleCreateNewComment}
      >
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          value={newCommentText}
          onChange={() => handleNewCommentChange}
          placeholder="Deixe um comentário"
          onInvalid={() => handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments?.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
