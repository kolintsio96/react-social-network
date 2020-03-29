import Profile from "./index";
import {
    addPost,
    addLike,
    getProfileData,
    getUserStatus,
    setStatus
} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {getUserId, isAuth} from "../../../redux/selectors/auth-selectors";
import {getBanner, getPosts, getProfile, getStatus} from "../../../redux/selectors/profile-selectors";

class ProfileClassContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = this.props.authorizedUserId;
            if(!userId){
                this.props.history.push('/login');
                return;
            }
        }
        this.props.getProfileData(userId);
        this.props.getUserStatus(userId);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.authorizedUserId !== this.props.authorizedUserId && this.props.authorizedUserId === null){
            this.props.history.push('/login');
            return;
        }
    }

    render() {
        return <Profile {...this.props} status={this.props.status} setStatus={this.props.setStatus}/>
    }
}

let mapStateToProps = (state) => {
    return {
        bannerUrl: getBanner(state),
        profile: getProfile(state),
        status: getStatus(state),
        posts: getPosts(state),
        isAuth: isAuth(state),
        authorizedUserId: getUserId(state)
    }
};
export default compose(withRouter, connect(mapStateToProps, {addPost, addLike, getProfileData, getUserStatus, setStatus}))(ProfileClassContainer)