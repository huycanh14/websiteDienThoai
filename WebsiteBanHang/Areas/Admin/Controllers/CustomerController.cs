using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebsiteBanHang.Class;
using WebsiteBanHang.Areas.Admin.Models;

namespace WebsiteBanHang.Areas.Admin.Models
{
    public class CustomerController : Controller
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        Customers customers = new Customers();
        // GET: Admin/Customer
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllCustomer()
        {
            var query = customers.GetAllCustomer();
            return Json(new { data = query, status = 200 }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FilterCustomer(string param)
        {
            var query = customers.FilterCustomer(param);
            return Json(new { data = query, status = 200 }, JsonRequestBehavior.AllowGet);
        }
    }
}