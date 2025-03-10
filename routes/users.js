const router = require("express").Router();
const User = require("../models/User.js");

//CRUD
//ユーザー情報の更新
router.put("/:id" , async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("ユーザー情報を更新できました");
        }catch (err) {
            return  res.status(500).json(err);
        }
    }else {
        return res
         .status(403)
         .json("あなたは自分のアカウントの時だけ情報を更新できます");
    }
})



//ユーザー情報の削除用
router.delete("/:id" , async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("ユーザー情報を削除できました");
        }catch (err) {
            return  res.status(500).json(err);
        }
    }else {
        return res
         .status(403)
         .json("あなたは自分のアカウントの時だけ情報を削除できます");
    }
});


//ユーザー情報の取得
router.get("/:id" , async(req, res) => {
        try{
            const user = await User.findById(req.params.id);
            const { password, updatedAt, ...other } = user._doc;
            res.status(200).json(other);
        }catch (err) {
            return  res.status(500).json(err);
        }
});

//ユーザーのフォロー
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({
                    $push: {
                     followers: req.body.userId,
                    },
                });
                await currentUser.updateOne({
                    $push: {
                        followings: req.params.id,
                    },
                });
                return res.status(200).json("フォローに成功しました");
            } else {
                return res
                 .status(403)
                 .json("すでにこのユーザーをフォローしています");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    }else {
        return res.status(500).json("自分のアカウントはフォローできません。");
    }
});


//ユーザーのフォロー解除
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            //自分のフォロワーにいる場合解除できる
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({
                    $pull: {
                     followers: req.body.userId,
                    },
                });
                await currentUser.updateOne({
                    $pull: {
                        followings: req.params.id,
                    },
                });
                return res.status(200).json("フォロー解除しました");
            } else {
                return res
                 .status(403)
                 .json("このユーザーをフォロー解除できません。");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    }else {
        return res.status(500).json("自分のアカウントはフォロー解除できません。");
    }
});






// router.get("/", (req,res) =>{
//     res.send("user router");
// });

module.exports = router;

