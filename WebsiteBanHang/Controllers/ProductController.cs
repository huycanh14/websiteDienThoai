using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebsiteBanHang.Class;
using WebsiteBanHang.Models;


namespace WebsiteBanHang.Controllers
{
    public class ProductController : Controller
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        Products products = new Products();
        // GET: Product
        public ActionResult Product(int id)
        {
            return View();
        }

        public JsonResult SearchProductNoCategoryAll(string keyword)
        {
            var data = products.SearchProductNoCategory(keyword, 1);
            int count = products.CountSearchProductNoCategory(keyword);
            return Json(new { data, count, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SearchProductNoCategoryInPage(string keyword, string page)
        {
            var data = products.SearchProductNoCategory(keyword, int.Parse(page));
            return Json(new { data, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SearchProductHasCategoryAll(string category, string keyword)
        {
            var data = products.SearchProductHasCategory(int.Parse(category),keyword, 1);
            int count = products.CountSearchProductHasCategory(int.Parse(category), keyword);
            return Json(new { data, count, status = 200 }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SearchProductHasCategoryInPage(string category,string keyword, string page)
        {
            var data = products.SearchProductHasCategory(int.Parse(category), keyword, int.Parse(page));
            return Json(new { data, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProduct(string id)
        {
            var data = products.GetProduct(int.Parse(id));
            return Json(new { data, status = 200 }, JsonRequestBehavior.AllowGet);
        }
    }
}