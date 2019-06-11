using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebsiteBanHang.Class;
using WebsiteBanHang.Areas.Admin.Models;

namespace WebsiteBanHang.Areas.Admin.Controllers
{
    public class ProdutcCategoryController : Controller
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        Product_categories product_Categories = new Product_categories();
        // GET: Admin/ProdutcCategory
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            var query = db.GetAllProductCategories();
            return Json(new { data = query, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetProductCategory(string id)
        {
            var query = product_Categories.GetProductCategory(int.Parse(id));
            return Json(new { data = query, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateCategory()
        {
            object[] category = new object[] { Request.Form["id"], Request.Form["name"], Request.Form["description"], Request.Form["status"] };
            var query = product_Categories.UpdateCategory(category);
            var data = new object(); var status = 200;
            if(query == "true")
            {
                data = "OK";
            }
            else
            {
                data = query;
                status = 400;
            }
            return Json(new { data = data, status = status }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CreateCategory()
        {
            object[] category = new object[] {Request.Form["name"], Request.Form["description"], Request.Form["status"] };
            var query = product_Categories.CreateCategory(category);
            var data = new object(); var status = 200;
            if (query == "true")
            {
                data = "OK";
            }
            else
            {
                data = query;
                status = 400;
            }
            return Json(new { data = data, status = status }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteCategory(int id)
        {
            bool query = product_Categories.DeleteCategory(id);
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