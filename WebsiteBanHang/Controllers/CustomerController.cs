using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebsiteBanHang.Class;
using WebsiteBanHang.Models;

namespace WebsiteBanHang.Controllers
{
    public class CustomerController : Controller
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        Customers customers = new Customers();
        // GET: Customer
        public ActionResult SignIn()
        {
            return View();
        }

        public ActionResult ProFile()
        {
            return View();
        }

        public JsonResult HasAccount()
        {
            bool data = false;
            if (Session["Account"] != null)
            {
                data = true;
            }
            return Json(new { data, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult HasEmail(string email)
        {
            bool query = customers.HasEmail(email);
            string data = "";
            int status = 200;
            if (query == true)
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
        public JsonResult InsertAccount()
        {
            object[] account = new object[] { Request.Form["email"], Request.Form["fullname"], Request.Form["password"], Request.Form["gender"], Request.Form["date_of_birth"], Request.Form["phone"], Request.Form["address"]};
            var query = customers.CreateAccount(account);
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

        [HttpPost]
        public JsonResult Logoup()
        {
            object[] user = new object[] { Request.Form["email"], Request.Form["password"] };
            string mess = "";
            int status = 400;
            if (customers.Logoup(user) == true)
            {
                mess = "Đăng nhập thành công";
                status = 200;
                Session["Account"] = user[0];
            }
            else
            {
                mess = "Đăng nhập thất bại";
                status = 400;
            }
            return Json(new { message = mess, status = status });
        }

        public JsonResult GetAccount()
        {
            string email = Session["Account"].ToString();
            object data = customers.GetInfoAccount(email);
            return Json(new { data, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateAccount()
        {
            object[] account = new object[] { Request.Form["id"], Request.Form["email"], Request.Form["fullname"], Request.Form["password"], Request.Form["gender"], Request.Form["date_of_birth"], Request.Form["phone"], Request.Form["address"], Request.Form["status"] };
            var query = customers.UpdateAccount(account);
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

        public JsonResult LogOut()
        {
            //Session.Abandon();
            Session.Remove("Account");
            return Json(new { status = 200 }, JsonRequestBehavior.AllowGet);
        }
    }
}