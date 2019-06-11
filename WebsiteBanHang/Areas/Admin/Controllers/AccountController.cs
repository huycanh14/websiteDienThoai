using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebsiteBanHang.Class;
using WebsiteBanHang.Areas.Admin.Models;

namespace WebsiteBanHang.Areas.Admin.Controllers
{
    public class AccountController : Controller
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        Admins admins = new Admins();
        // GET: Admin/Account
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllAccount()
        {
            var query = admins.GetAllAccount();
            return Json(new { data = query, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AccountEdit(int id)
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetInfoAccount(string id)
        {
            var query = admins.GetInfoAccount(int.Parse(id));
            return Json(new { data = query, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateAccount()
        {
            object[] account = new object[] { Request.Form["id"], Request.Form["email"], Request.Form["fullname"], Request.Form["password"], Request.Form["gender"], Request.Form["date_of_birth"], Request.Form["phone"], Request.Form["address"], Request.Form["status"] };
            var query = admins.UpdateAccount(account);
            object data = "";
            int status = 200;
            if (query == "true")
            {
                data = "OK";
            }
            else
            {
                data = query;
                status = 400;

            }
            return Json(new { data, status }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CreatAccount()
        {
            return View();
        }
        [HttpPost]
        public JsonResult InsertAccount()
        {
            object[] account = new object[] {Request.Form["email"], Request.Form["fullname"], Request.Form["password"], Request.Form["gender"], Request.Form["date_of_birth"], Request.Form["phone"], Request.Form["address"], Request.Form["status"] };
            var query = admins.CreateAccount(account);
            object data = "";
            int status = 200;
            if (query == "true")
            {
                data = "OK";
            }
            else
            {
                data = query;
                status = 400;

            }
            return Json(new { data, status }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult HasEmail(string email)
        {
            bool query = admins.HasEmail(email);
            string data = "";
            int status = 200;
            if(query == true)
            {
                data = "Email đã tồn tại";
                status = 400;
            }
            else
            {
                data = "Emai chưa tồn tại";
                status = 200;
            }
            return Json(new { data, status }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteAccount(string id)
        {
            bool query = admins.DeleteAccount(int.Parse(id));
            if (query == true)
            {
                return Json(new { data = "OK", status = 200 });
            }
            else
            {
                return Json(new { data = "False", status = 400 });
            }
        }
    }
}