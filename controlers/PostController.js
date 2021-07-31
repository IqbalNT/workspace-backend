const { connect, mongoType, startSession } = require("../database/db");
const apiResponse = require("../helpers/response");
const { Post } = require("../models/post");

exports.newPostCreate = [
  async function (req, res) {
    try {
      await connect();
      const data = new Post({
        userId: req.body.userId,
        userName: req.body.userName,
        post: req.body.post,
        upVotes: [],
        downVotes: [],
        comments: [],
        isDisabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await Post.create([data]).then((data) => {
        return apiResponse.successResponseWithData(
          res,
          "Operation success",
          data
        );
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
exports.addComment = [
  async function (req, res) {
    await connect();
    const session = await startSession();
    session.startTransaction();
    try {
      const comment = {
        commenterId: req.body.commenterId,
        commenterName: req.body.commenterName,
        comment: req.body.comment,
        isDisabled: false,
      };
      const data = await Post.updateOne(
        {
          _id: req.params.postId,
          isDisabled: false,
        },
        {
          $push: {
            comments: comment,
          },
        }
      ).session(session);
      if (data.n === 0) {
        return apiResponse.notFoundResponse(res, "Not found");
      }
      if (data.nModified === 0) {
        return apiResponse.notFoundResponse(res, "Not Updatd");
      }
      await session.commitTransaction();
      session.endSession();
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        data
      );
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
exports.addUpVote = [
  async function (req, res) {
    await connect();
    const session = await startSession();
    session.startTransaction();
    try {
      const voterInfo = {
        voterId: req.body.voterId,
        voterName: req.body.votername,
        isDisabled: false,
      };

      let getUpVoteData = await Post.findById(req.params.postId);

      const checkUserUpVote = getUpVoteData.upVotes.filter(
        (dd) => dd.voterId === req.body.voterId
      );
      const checkUserDownVote = getUpVoteData.downVotes.filter(
        (dd) => dd.voterId === req.body.voterId
      );
      let data;
      if (checkUserUpVote.length) {
        data = await Post.updateOne(
          {
            _id: req.params.postId,
            isDisabled: false,
          },
          {
            $pull: {
              upVotes: voterInfo,
            },
          }
        ).session(session);
      } else {
        if (checkUserDownVote.length) {
          data = await Post.updateOne(
            {
              _id: req.params.postId,
              isDisabled: false,
            },
            {
              $pull: {
                downVotes: voterInfo,
              },
            }
          ).session(session);
          data1 = await Post.updateOne(
            {
              _id: req.params.postId,
              isDisabled: false,
            },
            {
              $push: {
                upVotes: voterInfo,
              },
            }
          ).session(session);
        } else {
          data = await Post.updateOne(
            {
              _id: req.params.postId,
              isDisabled: false,
            },
            {
              $push: {
                upVotes: voterInfo,
              },
            }
          ).session(session);
        }
      }

      if (data.n === 0) {
        return apiResponse.notFoundResponse(res, "Not found");
      }
      if (data.nModified === 0) {
        return apiResponse.notFoundResponse(res, "Not Updatd");
      }
      await session.commitTransaction();
      session.endSession();
      return apiResponse.successResponseWithData(res, "Operation success", {});
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
exports.addDownVote = [
  async function (req, res) {
    await connect();
    const session = await startSession();
    session.startTransaction();
    try {
      const voterInfo = {
        voterId: req.body.voterId,
        voterName: req.body.votername,
        isDisabled: false,
      };

      let getUpVoteData = await Post.findById(req.params.postId);

      const checkUserDownVote = getUpVoteData.downVotes.filter(
        (dd) => dd.voterId === req.body.voterId
      );
      const checkUserUpVote = getUpVoteData.upVotes.filter(
        (dd) => dd.voterId === req.body.voterId
      );
      let data;
      let data1;
      if (checkUserDownVote.length) {
        data = await Post.updateOne(
          {
            _id: req.params.postId,
            isDisabled: false,
          },
          {
            $pull: {
              downVotes: voterInfo,
            },
          }
        ).session(session);
      } else {
        if (checkUserUpVote.length) {
          data = await Post.updateOne(
            {
              _id: req.params.postId,
              isDisabled: false,
            },
            {
              $pull: {
                upVotes: voterInfo,
              },
            }
          ).session(session);
          data1 = await Post.updateOne(
            {
              _id: req.params.postId,
              isDisabled: false,
            },
            {
              $push: {
                downVotes: voterInfo,
              },
            }
          ).session(session);
        } else {
          data = await Post.updateOne(
            {
              _id: req.params.postId,
              isDisabled: false,
            },
            {
              $push: {
                downVotes: voterInfo,
              },
            }
          ).session(session);
        }
      }

      if (data.n === 0) {
        return apiResponse.notFoundResponse(res, "Not found");
      }
      if (data.nModified === 0) {
        return apiResponse.notFoundResponse(res, "Not Updatd");
      }
      await session.commitTransaction();
      session.endSession();
      return apiResponse.successResponseWithData(res, "Operation success", {});
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
exports.allPost = [
  async function (req, res) {
    try {
      await connect();
      const data = await Post.aggregate([
        {
          $match: {
            isDisabled: false,
          },
        },
        {
          $sort: { _id: -1 },
        },
      ]);
      return apiResponse.successResponseWithData(
        res,
        "Success",
        data ? data : []
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
