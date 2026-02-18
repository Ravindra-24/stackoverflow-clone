import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import copy from "copy-to-clipboard";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import upVotes from "../../assets/sort-up.svg";
import downVotes from "../../assets/sort-down.svg";
import Avatar from "../../components/Avatar/Avatar";
import "./Questions.css";
import DisplayAnswer from "./DisplayAnswer";
import { postAnswer, deleteQuestion, voteQuestion, fetchQuestionById } from "../../actions/question";

const QuestionDetails = ({ setProgress }) => {
  const { id } = useParams();
  const questionsState = useSelector((state) => state.questionsReducer);
  const User = useSelector((state) => state.currentUserReducer);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const questionFromStore = questionsState?.data?.find((item) => item._id === id);
    if (questionFromStore) {
      setQuestion(questionFromStore);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    fetchQuestionById(id)
      .then((data) => {
        if (isMounted) {
          setQuestion(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setQuestion(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, questionsState?.data]);

  const handlePostAns = (e) => {
    e.preventDefault();
    if (User === null) {
      alert("login or signup to answer a question");
      navigate("/Auth");
      return;
    }

    if (answer.trim() === "") {
      alert("Enter an answer before submitting");
      return;
    }

    dispatch(
      postAnswer(
        {
          id,
          answerBody: answer,
          userAnswered: User.result.name,
        },
        setProgress
      )
    );
    setAnswer("");
  };

  const handleShare = () => {
    const fullUrl = `${window.location.origin}${location.pathname}`;
    copy(fullUrl);
    alert("Copied URL :" + fullUrl);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate, setProgress));
  };

  const handleUpVote = () => {
    if (!User?.result?._id) {
      alert("login or signup to vote");
      navigate("/Auth");
      return;
    }
    dispatch(voteQuestion(id, "upVote"));
  };

  const handleDownVote = () => {
    if (!User?.result?._id) {
      alert("login or signup to vote");
      navigate("/Auth");
      return;
    }
    dispatch(voteQuestion(id, "downVote"));
  };

  if (isLoading) {
    return (
      <div className="question-details-page">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="question-details-page">
        <h2>Question not found</h2>
      </div>
    );
  }

  return (
    <div className="question-details-page">
      <div key={question._id}>
        <section className="question-details-container">
          <h1>{question.questionTitle}</h1>
          <div className="question-details-container-2">
            <div className="question-votes">
              <img src={upVotes} alt="" width="18" className="votes-icon" onClick={handleUpVote} />
              <p>{question.upVote.length - question.downVote.length}</p>
              <img src={downVotes} alt="" width="18" className="votes-icon" onClick={handleDownVote} />
            </div>
            <div style={{ width: "100%" }}>
              <p className="question-body">{question.questionBody}</p>
              <div className="question-details-tags">
                {question.questionTags.map((tag) => (
                  <p key={tag}>{tag}</p>
                ))}
              </div>
              <div className="question-actions-user">
                <div>
                  <button type="button" onClick={handleShare}>
                    Share
                  </button>
                  {User?.result?._id === question?.userId && (
                    <button type="button" onClick={handleDelete}>
                      Delete
                    </button>
                  )}
                </div>
                <div>
                  <p>asked {moment(question.askedOn).fromNow()}</p>
                  <Link to={`/Users/${question.userId}`} className="user-link" style={{ color: "#0086d8" }}>
                    <Avatar backgroundColor="orange" px="8px" py="5px">
                      {question.userPosted.charAt(0).toUpperCase()}
                    </Avatar>
                    <div>{question.userPosted}</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {question.noOfAnswers !== 0 && (
          <section>
            <h3>{question.noOfAnswers} Answers</h3>
            <DisplayAnswer key={question._id} question={question} handleShare={handleShare} setProgress={setProgress} />
          </section>
        )}
        <section className="post-ans-container">
          <h3>Your Answer</h3>
          <form onSubmit={handlePostAns}>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
            <br />
            <input type="submit" className="post-ans-btn" value="Post Your Answer" />
          </form>
          <p>
            Browse other Question tagged
            {question.questionTags.map((tag) => (
              <Link to="/Tags" key={tag} className="ans-tags">
                {tag}
              </Link>
            ))}{" "}
            or
            <Link to="/AskQuestion" style={{ textDecoration: "none", color: "#009dff" }}>
              ask your own question
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default QuestionDetails;
