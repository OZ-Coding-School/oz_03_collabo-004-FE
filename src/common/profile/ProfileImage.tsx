const ProfileImage = ({ src }: { src: string }) => {
    return (
        <div>
            <img
                className="rounded-full absolute object-cover w-full h-full"
                src={src === "" ? "/img/profile_placeholder.png" : src}
                alt="Profile Image"
            ></img>
        </div>
    );
};

export default ProfileImage;
