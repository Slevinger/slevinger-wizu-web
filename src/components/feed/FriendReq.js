import React from "react";

import { distanceFromTodayText } from "../../utils/timeDescriptor";
import useButtonGroup from "../../hooks/useButtonGroup";
import { Horizontal } from "../../components/StyledComponents";
import capitalize from "lodash/capitalize";
import { NavLink } from "react-router-dom";
import { Spacer } from "../StyledComponents";
import { PostImage, PostContent } from "./StyledFeedComponents";

export default ({
  otherUser,
  user,
  trigger_user_id,
  timeStamp,
  answer,
  confirmFriendRequest,
  ignoreFriendRequest
}) => {
  // debugger;
  const { GroupButton } = useButtonGroup(
    answer && answer === "confirm" ? 1 : answer === "igonre" ? 0 : null
  );

  return (
    <div style={{ flexDirection: "column", display: "flex" }}>
      <div style={{ flexDirection: "row", display: "flex" }}>
        <PostImage src={otherUser.profileImage + "?alt=media"} />
        <Spacer />
        <PostContent>
          {otherUser._id.toString() !== trigger_user_id ? (
            <Horizontal>
              <text>{`You have sent a Friend Request to `}</text>
              <NavLink to={`/home/profile?user_id=${otherUser._id}`}>
                {otherUser.username}
              </NavLink>
            </Horizontal>
          ) : (
            <Horizontal>
              <NavLink to={`/home/profile?user_id=${otherUser._id}`}>
                {otherUser.username}
              </NavLink>
              <text>{`, sent you a Friend Req`}</text>
            </Horizontal>
          )}

          <div style={{ flexDirection: "row", flex: 1 }}>
            <text style={{ color: "lightgrey" }}>
              {capitalize(distanceFromTodayText(timeStamp))}
            </text>
          </div>
          <div
            style={{
              flexDirection: "row",
              flex: 1,
              display: "flex",
              width: "100%"
            }}
          >
            <div style={{ flex: 1 }} />
            <div>
              <GroupButton
                index={0}
                onClick={() => {
                  ignoreFriendRequest(trigger_user_id);
                }}
              >
                ignore
              </GroupButton>
            </div>
            <div>
              <GroupButton
                onClick={() => {
                  confirmFriendRequest(trigger_user_id);
                }}
                index={1}
              >
                confirm
              </GroupButton>
            </div>
          </div>
        </PostContent>
      </div>
    </div>
  );
};
