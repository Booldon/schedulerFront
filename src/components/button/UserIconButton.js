import "../../css/TopBar.css"; // CSS 파일 임포트

const UserIconButton = ({ imageSrc, altText }) => {
  return (
    <button className="avatar-icon-button">
      <img src={imageSrc} alt={altText} className="avatar-image" />
    </button>
  );
};

export default UserIconButton;

// <AvatarIconButton imageSrc="path/to/your/image.jpg" altText="User Avatar" />
