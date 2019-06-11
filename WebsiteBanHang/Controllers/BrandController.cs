using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebsiteBanHang.Class;
using WebsiteBanHang.Models;


namespace WebsiteBanHang.Controllers
{
    public class BrandController : Controller
    {
        // GET: Brand
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        Brands brands = new Brands();
        Products products = new Products();
        public ActionResult Index(int id)
        {
            return View();
        }

        public JsonResult GetAll(string id)
        {
            var name = (from row in db.Brands
                          where row.id == int.Parse(id)
                          select new { name = row.name }).Take(1);
            //var data = 
            var data = products.GetProductInPageByBrand(int.Parse(id), 1);
            int count = products.CountProductInBrand(int.Parse(id));
            return Json(new { data, name, count, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProductInPage(string id, string page)
        {
            //var data = 
            var data = products.GetProductInPageByBrand(int.Parse(id), int.Parse(page));
            return Json(new { data, status = 200 }, JsonRequestBehavior.AllowGet);
        }
    }
}