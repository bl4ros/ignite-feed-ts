import React from "react";
import { ThumbsUp, Trash } from "phosphor-react";
import styles from "./Comment.module.css";
import { Avatar } from "./Avatar";

export interface CommentProps {
  content: string;
  onDeleteComment: (content: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = React.useState(0);

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1;
    });
  } //  sempre que for atualizar o state de alguma propriedade no react podemos usar a função atualizadora do useState para setar um novo valor. E dentro dessa função terá um outra função que terá uma prop e essa prop terá o valor dp estado atual dentro do escopo em que está

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  return (
    <div className={styles.comment}>
      <Avatar src="https://avatars.githubusercontent.com/u/95880342?v=4" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Fernando Nunes</strong>
              <time
                title="11 de setembro ás 11:12h"
                dateTime="2022-05-11 08:13:30"
              >
                Cerva de 1h atrás
              </time>
            </div>
            <button title="Deletar comentário">
              <Trash size={20} onClick={handleDeleteComment} />
            </button>
          </header>
          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
