import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { toast } from "react-toastify";

const PortfolioHeader = ({
  portfolio,
  recommending,
  setRecommendationState,
  recommend,
  unRecommend,
}) => {
  const notifySuccess = (message) => {
    toast.success(message);
  };
  const notifyWarning = (message) => {
    toast.warning(message);
  };
  let match = useRouteMatch();

  return (
    <div>
      <div className="d-sm-flex justify-content-between align-items-center mb-1 p-3">
        <h1 className="mr-2" style={{ color: "white" }}>
          {portfolio.name}
        </h1>
        {match.path === "/portfolios/:id" && recommending && (
          <div>
            <button
              className="btn button "
              onClick={async () => {
                try {
                  await unRecommend(portfolio._id);
                  setRecommendationState();
                  notifyWarning(
                    `You have stopped recommending ${portfolio.name}`
                  );
                } catch (err) {
                  console.log(err);
                  return;
                }
              }}
            >
              Recommending
            </button>
          </div>
        )}
        {match.path === "/portfolios/:id" && !recommending && (
          <div>
            <button
              className="btn button-outline"
              onClick={async () => {
                try {
                  await recommend(portfolio._id);
                  setRecommendationState();
                  notifySuccess(`You are now recommending ${portfolio.name}!`);
                } catch (err) {
                  console.log(err);
                  return;
                }
              }}
            >
              Recommend
            </button>
          </div>
        )}
        {match.path === "/myportfolio" && (
          <div className="d-flex flex-row ">
            <a
              className="btn button-outline mx-2"
              data-toggle="modal"
              data-target="#shareModal"
            >
              Share
            </a>
            <Link
              className="btn button-outline"
              to={{
                pathname: "/myportfolio/edit/profile",
                state: { portfolio },
              }}
            >
              <i className="fas fa-pen"></i>
            </Link>
          </div>
        )}
      </div>
      {/* <div className="pl-3">
        {portfolio.recommendations.length > 0 && (
          <span className="mr-4" style={{ color: "white" }}>
            <i className="fa fa-thumbs-up" style={{ color: "#00ad8e" }}></i>
            {portfolio.recommendations.length}{" "}
            {portfolio.recommendations.length > 1
              ? "Recommendations"
              : "Recommendation"}
          </span>
        )}
        {portfolio.comments.length > 0 && (
          <span style={{ color: "white" }}>
            <i
              className="fas fa-comment-alt mr-3"
              style={{ color: "#00ad8e" }}
            ></i>
            {portfolio.comments.length}{" "}
            {portfolio.recommendations.length > 1 ? "Comments" : "Comment"}
          </span>
        )}
      </div> */}

      <div
        className="modal fade"
        id="shareModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="shareModalLabel">
                Use this link to share your portfolio!
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{`https://portfolio-app-frontend-pf.herokuapp.com/portfolios/${portfolio._id}`}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHeader;
