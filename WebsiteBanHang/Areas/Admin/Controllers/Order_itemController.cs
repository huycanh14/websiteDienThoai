using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebsiteBanHang.Class;
using WebsiteBanHang.Areas.Admin.Models;

namespace WebsiteBanHang.Areas.Admin.Controllers
{
    public class Order_itemController : Controller
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        Order_items order_Items = new Order_items();
        // GET: Admin/Order_item
        public ActionResult Index(int id)
        {
            return View();
        }

        public JsonResult GetListOrder_item(string order_id)
        {
            var title = "Danh sách mã đơn hàng " + order_id;
            
            var query = order_Items.GetListOrder_item(int.Parse(order_id));
            return Json(new { data = query, status = 200, title = title }, JsonRequestBehavior.AllowGet);
        }
    }
}