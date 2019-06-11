using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebsiteBanHang.Class;
using WebsiteBanHang.Models;
namespace WebsiteBanHang.Controllers
{
    public class OrderController : Controller
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        Orders orders = new Orders();
        // GET: Order
        public ActionResult Cart()
        {
            return View();
        }

        [HttpPost]
        public JsonResult AddOrder()
        {
            object[] order = new object[] { Request.Form["qty"], Request.Form["price"], Request.Form["customer_id"], Request.Form["name"], Request.Form["phone"], Request.Form["address"]};
            int query = orders.AddOrder(order);
            object data = "";
            int status = 200;
            if (query > 0)
            {
                data = query;
            }
            else
            {
                data = query;
                status = 400;

            }
            return Json(new { data, status }, JsonRequestBehavior.AllowGet);
        }
    }
}