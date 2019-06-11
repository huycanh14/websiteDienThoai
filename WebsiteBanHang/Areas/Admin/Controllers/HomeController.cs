using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebsiteBanHang.Areas.Admin.Models;

namespace WebsiteBanHang.Areas.Admin.Controllers
{
    public class HomeController : Controller
    {
        Admins admin = new Admins();
        Orders orders = new Orders();
        Customers customers = new Customers();
        Products products = new Products();
        Brands brands = new Brands();
        Product_categories product_Categories = new Product_categories();
        // GET: Admin/Home
        public ActionResult Index()
        {
            if(Session["Admin"] == null)
            {

                this.Response.Redirect("Login");
            }
            return View();
        }

        public ActionResult Login()
        {
            if(Session["Admin"] != null)
            {
                this.Response.Redirect("/Admin/Home/");
            }
            return View();
        }

        [HttpPost]
        public JsonResult Logoup()
        {
            object[] user = new object[] { Request.Form["email"] , Request.Form["password"]};
            string mess = "";
            int status = 400;
            if(admin.Logoup(user) == true)
            {
                mess = "Đăng nhập thành công";
                status = 200;
                Session["Admin"] = user[0];
            }
            else
            {
                mess = "Đăng nhập thất bại";
                status = 400;
            }
            return Json(new { message = mess, status = status});
        }

        public ActionResult Home()
        {
            return PartialView();
        }

        [HttpGet]
        public JsonResult CountOrderNew()
        {
            int count = orders.CountOrderNew();
            return Json(new { count = count, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult CountOrderOld()
        {
            int count = orders.CountOrderOld();
            return Json(new { count = count, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult CountCustomer()
        {
            int count = customers.CountCustomer();
            return Json(new { count = count, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult CountProduct()
        {
            int count = products.CountProduct();
            return Json(new { count = count, status = 200 }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult CountProductInBrand()
        {
            object query = brands.CountProductInBrand();
            return Json(new { data = query, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult CountProductInProductCategory()
        {
            object query = product_Categories.CountProductInProductCategory();
            return Json(new { data = query, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Logout()
        {
            Session.Abandon();
            this.Response.Redirect("/Admin/Home/");
            return View();
        }
    }
}