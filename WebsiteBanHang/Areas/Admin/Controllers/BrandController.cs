using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebsiteBanHang.Areas.Admin.Models;
using WebsiteBanHang.Class;

namespace WebsiteBanHang.Areas.Admin.Controllers
{
    public class BrandController : Controller
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        Brands brands = new Brands();
        // GET: Admin/Brand
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAll()
        {
            var query = db.GetAllBrands();
            return Json(new { data = query, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetBrand(string id)
        {
            var query = brands.GetBrand(int.Parse(id));
            return Json(new { data = query, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateBrand()
        {
            object[] brand = new object[] { Request.Form["id"], Request.Form["name"], Request.Form["description"], Request.Form["status"] };
            var query = brands.UpdateBrand(brand);
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
        public JsonResult CreateBrand()
        {
            object[] brand = new object[] { Request.Form["name"], Request.Form["description"], Request.Form["status"] };
            var query = brands.CreateBrand(brand);
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
        public JsonResult DeleteBrand(int id)
        {
            bool query = brands.DeleteBrand(id);
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