const userModel = require("../user/user.models");

exports.register = async (req, res) => {
  const username = req.body.username.toLowerCase();
  const user = await userModel.getUsers(username);
  if (user) res.status(409).send("Tên tài khoản đã tồn tại.");
  else {
    const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
    const newUser = {
      username: username,
      password: hashPassword,
    };
    const createUser = await userModel.createUser(newUser);
    if (!createUser) {
      return res
        .status(400)
        .send("Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.");
    }
    return res.send({
      username,
    });
  }
};
