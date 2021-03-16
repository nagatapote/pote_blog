export const ImagePreview = (props) => {
  return (
    <div onClick={() => props.delete(props.id)}>
      <img width="300px" alt={"プレビュー画像"} src={props.path} />
    </div>
  );
};
