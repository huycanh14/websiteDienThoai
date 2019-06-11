using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebsiteBanHang.Class;
using WebsiteBanHang.Models;

namespace WebsiteBanHang.Controllers
{
    public class HomeController : Controller
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        Products products = new Products();
        public ActionResult Index()
        {
            return View();
        }

        //public ActionResult About()
        //{
        //    ViewBag.Message = "Your application description page.";

        //    return View();
        //}

        //public ActionResult Contact()
        //{
        //    ViewBag.Message = "Your contact page.";

        //    return View();
        //}
        public ActionResult Home()
        {
            return View();
        }
        public JsonResult Header()
        {
            var product_categories = db.GetAllProductCategories();
            var brands = db.GetAllBrands();
            return Json(new {product_categories, brands, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProductNew()
        {
            var data = products.GetProductNew();
            return Json(new { data, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Search()
        {
            return View();
        }
    }
}