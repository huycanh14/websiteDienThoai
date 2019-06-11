using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebsiteBanHang.Class;
using WebsiteBanHang.Models;
using System.Web.Mvc;

namespace WebsiteBanHang.Controllers
{
     
    public class Order_itemController : Controller
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        Order_items orders = new Order_items();
        // GET: Order_item
        [HttpPost]
        public JsonResult AddOrder_item()
        {
            object[] order = new object[] { Request.Form["order_id"],Request.Form["product_id"],Request.Form["code"], Request.Form["qty"], Request.Form["price"], Request.Form["size"], Request.Form["color"] };
            int query = orders.AddOrder_item(order);
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