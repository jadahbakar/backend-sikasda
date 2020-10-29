var db = require("../db");
var auth = require("../auth/authentication");
var asyncro = require("../middleware/asyncro");

function postLogin2(req, response, next) {
  // console.log(req.body);
  db.task(t => {
    return t
      .one("SELECT sec.users_login(${username}, ${userpass})", req.body)
      .then(userku => {
        // console.log("userku->", userku);
        // console.log(userku.users_login.userrole);
        return t
          .any(
            "SELECT sec.generate_parent($1) AS menu",
            userku.users_login.userrole
          )
          .then(menu => {
            // console.log(menu);
            return { userku, menu };
          });
        return { userku };
      });
  })
    .then(data => {
      // console.log("data->", data.menu);
      // console.log("panjang->", data.menu.length);
      data.menu.forEach((element, index) => {
        // console.log(element.menu.children);
        if (
          element.menu.children === null &&
          element.menu.name !== "Dashboard"
        ) {
          // console.log(index);
          data.menu.splice(index, 1);
        }
      });
      // console.log(data.menu);

      response.status(200).json({
        // success: true,
        // datauser: data.userku.users_login,
        token: auth.createJWToken({
          sessionData: data.userku.users_login.userid,
          maxAge: 3600
        }),
        userId: data.userku.users_login.userid,
        userName: data.userku.users_login.username,
        userStatus: data.userku.users_login.usersts,
        userRole: data.userku.users_login.userrole,
        pegawaiNama: data.userku.users_login.pegawai_nama,
        pegawaiUnitKerja: data.userku.users_login.pegawai_unit_kerja,
        unitKerjaNama: data.userku.users_login.unit_kerja_nama,
        pegawaiJabatan: data.userku.users_login.pegawai_jabatan,
        jabatanNama: data.userku.users_login.jabatan_nama,
        usermenu: data.menu

        // hapus menu yang tidak punya Children
      });
    })
    .catch(error => {
      // failed
      response.status(401).json({
        message:
          error ||
          "Validation failed. Given username and password aren't matching."
      });
    });
}

const postLogin = asyncro.asyncHandler(async (request, response, next) => {
  // console.log(request.body);
  let getUser = await db.oneOrNone(
    "SELECT sec.users_login(${username}, ${userpass})",
    request.body
  );
  // console.log(getUser);
  if (getUser !== null) {
    let getMenu = await db.any(
      "SELECT sec.generate_parent($1) AS menu",
      getUser.users_login.userrole
    );
    // console.log(getMenu);
    getMenu.forEach((element, index) => {
      // console.log(element.menu.children);
      if (element.menu.children === null && element.menu.name !== "Dashboard") {
        // console.log(index);
        getMenu.splice(index, 1);
      }
    });
    // console.log(data.menu);
    // let getAttribUser = await db.any(
    //   "SELECT sec.generate_parent($1) AS menu",
    //   getUser.users_login.userrole
    // );
    response.json({ getUser, getMenu });
  } else {
    // return next(err);
    response.status(204).json({
      status: "No Content",
      // data: data,
      message: "User tidak ditemukan"
    });
  }
  // response.json(getUser);
});

function postLogin3(request, response, next) {
  db.oneOrNone("SELECT sec.users_login(${username}, ${userpass})", request.body)
    .then(data => {
      console.log(data);
      response.status(200).json({
        data: data.users_login
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

module.exports = {
  postLogin: postLogin
  // getLoginSDM: getLoginSDM
};
