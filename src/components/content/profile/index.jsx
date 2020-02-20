import React from 'react';
import style from './index.module.scss';
import Banner from './banner'
import ProfileInfo from "./profileInfo";
import Posts from "./posts";
import Preloader from "../../common/preloader";

const Profile = (props) => {
    if (!props.profile) return <Preloader/>
    return (
        <div className={style.profile}>
            <Banner banner={props.bannerUrl} />
            <ProfileInfo userInfo={props.profile} />
            <Posts
                posts={props.posts}
                postPhoto={props.profile.photos.large}
                addLike={props.addLike}
                addPost={props.addPost}
                changeText={props.changeText}
                newPostText={props.newPostText}
            />
        </div>
    )
}
export default Profile