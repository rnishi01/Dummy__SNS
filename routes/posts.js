const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User.js");

//投稿を作成する
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost =  await newPost.save();
        return res.status(200).json(savedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//投稿を更新する
router.put("/:id" , async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({
                $set: req.body,
            });
            return res.status(200).json("投稿に成功しました！");
        }else {
            return res.status(403).json("自分自身以外の投稿は編集できません");
        }
    }catch(err) {
        return res.status(403).json(err);
    }
}
);

//投稿を削除する
router.delete("/:id" , async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne({
                $set: req.body,
            });
            return res.status(200).json("投稿削除に成功しました！");
        }else {
            return res.status(403).json("自分自身以外の投稿は削除できません");
        }
    }catch(err) {
        return res.status(403).json(err);
    }
}
);

//特定の投稿を取得
router.get("/:id" , async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    }catch(err) {
        return res.status(403).json(err);
    }
}
);

//いいね機能
router.put("/:id/like", async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            //まだいいねを押していなかったらいいねできる
            if(!post.likes.includes(req.body.userId)) {
                await post.updateOne({
                    $push: {
                     likes: req.body.userId,
                    },
                });
                return res.status(200).json("いいねに成功しました");
            } else {
                //いいねを取り消す
                await post.updateOne({
                    $pull: {
                        likes: req.body.userId,
                    },
                });
                return res
                 .status(403)
                 .json("いいねを解除しました。");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
});

//タイムラインを取得
router.get("/timeline/all", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({ userId: currentUser._id});
        //フォローしている人の投稿をすべて取得
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId});
            })
        );
        return res.status(200).json(userPosts.concat(...friendPosts));
    } catch (error) {
        return res.status(500).json(err);
    }
});

module.exports = router;

