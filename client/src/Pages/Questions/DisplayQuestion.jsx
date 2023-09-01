import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import QuestionsDetails from "./QuestionDetails";

const DisplayQuestion = ({setProgress}) => {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <QuestionsDetails setProgress={setProgress}/>
        <RightSidebar />
      </div>
    </div>
  );
};

export default DisplayQuestion;
