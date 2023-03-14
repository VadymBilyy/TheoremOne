import classNames from "classnames";
import * as React from "react";
import {
  FeedbackT,
  Question2TWithResponse,
  QuestionWithResponse,
} from "../../common/feedback.model";
import Rating from "../../components/Questions/Rating";
import User from "../../components/User";
import { AccountContext } from "../../context/AccountProvider";
import { FeedbacksContext } from "../../context/FeedbackProvider";
import { Nullable, UserT } from "../../context/types";
import { UserContext } from "../../context/UserProvider";
import MainLayout from "../../layouts/MainLayout";
import NoFeedback from "./NoFeedback";
import styles from "./reviewFeedback.module.css";

type RenderResponseType = "scale" | "text" | "multipleChoice" | "Skipped";

const getResponseType = (
  question: QuestionWithResponse
): RenderResponseType => {
  if (!question.required && !question.response) {
    return "Skipped";
  }

  return question.type;
};

interface ReviewFeedbackProps {
  mode: "given" | "received";
}

const ReviewFeedback: React.FC<ReviewFeedbackProps> = ({ mode }) => {
  const users = React.useContext(UserContext);
  const currentUser = React.useContext(AccountContext);
  const { feedbacks } = React.useContext(FeedbacksContext);

  const [selectedFeedback, setSelectedFeedback] =
    React.useState<Nullable<FeedbackT>>(null);
  const [feedbacksToDisplay, setFeedbacksToDisplay] = React.useState<
    FeedbackT[]
  >([]);

  React.useEffect(() => {
    const shownFeedbacks = feedbacks.filter((feedback) => {
      const feedbackIdToCompare =
        mode === "given" ? feedback.from : feedback.to;
      return feedbackIdToCompare === currentUser?.id && feedback.isComplete;
    });
    setFeedbacksToDisplay(shownFeedbacks);
    if (shownFeedbacks.length > 0) {
      setSelectedFeedback(shownFeedbacks[0]);
    }
  }, [mode]);

  const renderListOfFeedbacks = (
    feedbacksToDisplay: FeedbackT[],
    users: UserT[]
  ) => (
    <ul className={styles.users}>
      {feedbacksToDisplay.map((feedbackToDisplay) => {
        const user = users.find((user) => {
          const userIdToCompare =
            mode === "given" ? feedbackToDisplay.to : feedbackToDisplay.from;
          return user.id === userIdToCompare;
        })!;
        return (
          <li key={feedbackToDisplay.id}>
            <button
              onClick={() => setSelectedFeedback(feedbackToDisplay)}
              className={classNames(
                styles.feedbackButton,
                feedbackToDisplay.id === selectedFeedback?.id && styles.active
              )}
            >
              <User name={user.name} avatarUrl={user.avatarUrl} />
            </button>
          </li>
        );
      })}
    </ul>
  );

  const getMultipleChoiceResponse = (question: Question2TWithResponse) =>
    question.options.find(
      (option) => option.value.toString() === question?.response
    );

  const renderResponse = (
    responseType: RenderResponseType,
    question: QuestionWithResponse
  ) => {
    switch (responseType) {
      case "Skipped":
        return <span className={styles.skipped}>SKIPPED</span>;
      case "text":
        return <p className={styles.text}>{question.response}</p>;
      case "scale":
        return (
          <Rating value={question.response} onChange={() => {}} isStatic />
        );
      case "multipleChoice":
        return (
          <p className={styles.text}>
            {
              getMultipleChoiceResponse(question as Question2TWithResponse)
                ?.label
            }
          </p>
        );
    }
  };

  const renderFeedback = (feedback: FeedbackT, users: UserT[]) => {
    const feedbackUserName = users.find((user) => {
      const feedbackIdToCompare =
        mode === "given" ? feedback.to : feedback.from;
      return user.id === feedbackIdToCompare;
    });

    const title = feedbackUserName ? `${feedbackUserName.name}'s Feedback` : "";

    return (
      <div className={styles.feedbackDetailsContainer}>
        <h3 className={styles.title}>{title}</h3>
        <ul className={styles.feedback}>
          {feedback.questions.map((question) => {
            const responseType = getResponseType(question);
            return (
              <li className={styles.feedbackDetailsItem}>
                <p className={styles.text}>{question.label}</p>
                <div className={styles.responseContainer}>
                  {renderResponse(responseType, question)}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  const sectiontitle = `${mode === "given" ? "My" : "Team"} Feedback`;

  return (
    <MainLayout loggedIn>
      {feedbacksToDisplay.length > 0 && <h1>{sectiontitle}</h1>}

      {feedbacksToDisplay.length && users ? (
        <div className={styles.feedbackContainer}>
          {renderListOfFeedbacks(feedbacksToDisplay, users)}
          {selectedFeedback && users && renderFeedback(selectedFeedback, users)}
        </div>
      ) : (
        <div className={styles.noFeedbackContainer}>
          <NoFeedback />
        </div>
      )}
    </MainLayout>
  );
};

export default ReviewFeedback;
