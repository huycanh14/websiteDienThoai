using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebsiteBanHang.Class;
using WebsiteBanHang.Areas.Admin.Models;

namespace WebsiteBanHang.Areas.Admin.Controllers
{
    public class OrderController : Controller
    {
        // GET: Admin/Order/status
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        Orders orders = new Orders();
        [HttpGet]
        public ActionResult Index(int id)
        {
            return View();
        }

        public JsonResult GetListOrder(string status)
        {
            var title = "";
            if(status == "0")
            {
                title = "Danh sách đơn hàng chưa được giao";
            }
            if(status == "1")
            {
                title = "Danh sách đơn hàng đã được giao";
            }
            var query = orders.GetListOrder(int.Parse(status));
            return Json(new { data = query, status = 200,  title = title}, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CheckOrder()
        {
            var order_id = Request.Form["order_id"];
            var query = orders.CheckOrder(int.Parse(order_id));
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
        public JsonResult DeleteOrder()
        {
            var order_id = Request.Form["order_id"];
            var query = orders.DeleteOrder(int.Parse(order_id));
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
    }
}