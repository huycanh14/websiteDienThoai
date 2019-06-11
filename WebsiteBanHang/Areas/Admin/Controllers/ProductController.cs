using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebsiteBanHang.Areas.Admin.Models;
using WebsiteBanHang.Class;
namespace WebsiteBanHang.Areas.Admin.Controllers
{
    public class ProductController : Controller
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        Products products = new Products();
        // GET: Admin/Product
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAllProduct()
        {
            object query = products.GetAllProduct();
            object total = products.CountProduct();
            return Json(new { data = query, status = 200, total }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult FilterProduct(string param, string brand_id, string product_category_id)
        {
            //string param1 = Request.Form["par;
            //string param = Request.ToString();
            object query = products.FilterProduct(param, brand_id, product_category_id);
            int total = products.CountFilterProduct(param, brand_id, product_category_id);
            return Json(new { data = query, status = 200, total }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ProductAdd()
        {
            if (Session["Admin"] == null)
            {
                this.Response.Redirect("/Admin/Home/Login");
            }
            var product_categories = db.GetAllProductCategories();
            var brands = db.GetAllBrands();
            ViewBag.Product_categories = product_categories;
            ViewBag.Brands = brands;
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult ProductAdd(Products product, HttpPostedFileBase img)
        {
            try
            {
                var product_categories = db.GetAllProductCategories();
                var brands = db.GetAllBrands();
                ViewBag.Product_categories = product_categories;
                ViewBag.Brands = brands;
                string filename = Path.GetFileNameWithoutExtension(img.FileName);
                string extension = Path.GetExtension(img.FileName);
                if (extensionFile(extension) == true)
                {
                    if (products.UniqueCode(product.code, product.id) == true)
                    {
                        var _filename = filename + extension;
                        filename = filename + extension;
                        var httpPostedFile = HttpContext.Request.Form["img"];
                        var t = Path.GetFileName(Request.Form["img"] + "salsda");
                        filename = Path.Combine(Server.MapPath("~/Image"), filename);
                        img.SaveAs(filename);
                        product.img = _filename;
                        object result = products.InsertProduct(product);
                        if (result == "true")
                        {
                            TempData["messageSuccess"] = "Thêm thành công";
                        }
                        else
                        {
                            TempData["messageError"] = result;
                        }

                    }
                    else
                    {
                        TempData["messageError"] = "Code đã tồn tại";
                    }
                }
                else
                {
                    TempData["messageError"] = "File không đúng định dạng, hãy điền lại dữ liệu";
                }
                this.Response.Redirect("/Admin/Home/#!/product_add");
            }
            catch(Exception ex)
            {
                TempData["messageError"] = ex;
                this.Response.Redirect("/Admin/Home/#!/product_add");
            }
            //return View();
            return RedirectPermanent("/Admin/Home/#!/product_add");
        }
        public bool extensionFile(string extension)
        {
            var st_Exten = extension.ToLower();
            switch (st_Exten)
            {
                case ".jpg":
                    return true;
                case ".jpeg":
                    return true;
                case ".png":
                    return true;
                case ".gif":
                    return true;
                default:
                    return false;
            }
        }

        [HttpGet]
        public ActionResult ProductEdit(int id)
        {
            Products product = products.GetProducts(id);
            if (Session["Admin"] == null)
            {
                this.Response.Redirect("/Admin/Home/Login");
            }
            var product_categories = db.GetAllProductCategories();
            var brands = db.GetAllBrands();
            ViewBag.Product_categories = product_categories;
            ViewBag.Brands = brands;
            return View(product);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult ProductEdit(Products product, HttpPostedFileBase img)
        {
            int id = product.id;
            try
            {
                var product_categories = db.GetAllProductCategories();
                var brands = db.GetAllBrands();
                ViewBag.Product_categories = product_categories;
                ViewBag.Brands = brands;
                string filename = Path.GetFileNameWithoutExtension(img.FileName);
                string extension = Path.GetExtension(img.FileName);
                if(filename != "") {
                    if (extensionFile(extension) == true)
                    {
                        if (products.UniqueCode(product.code, product.id) == true)
                        {
                            var _filename = filename + extension;
                            filename = filename + extension;
                            var httpPostedFile = HttpContext.Request.Form["img"];
                            var t = Path.GetFileName(Request.Form["img"] + "salsda");
                            filename = Path.Combine(Server.MapPath("~/Image"), filename);
                            img.SaveAs(filename);
                            product.img = _filename;
                            
                        }
                        else
                        {
                            TempData["messageError"] = "Code đã tồn tại";
                        }
                    }
                    else
                    {
                        TempData["messageError"] = "File không đúng định dạng, hãy điền lại dữ liệu";
                    }
                }
                object result = products.UpdateProduct(product);
                if (result == "true")
                {
                    TempData["messageSuccess"] = "Sửa thành công";
                }
                else
                {
                    TempData["messageError"] = result;
                }

                this.Response.Redirect("/Admin/Home/#!/product_edit/" + id);
            }
            catch (Exception ex)
            {
                TempData["messageError"] = ex;
                this.Response.Redirect("/Admin/Home/#!/product_edit/" + id);
            }
            //return View();
            return RedirectPermanent("/Admin/Home/#!/product_edit/" + id);
        }

        [HttpPost]
        public JsonResult DeleteProduct(int id)
        {
            bool query = products.DeleteProduct(id);
            if(query == true)
            {
                return Json(new { data = "OK", status = 200 });
            }
            else
            {
                return Json(new { data = "False", status = 400 });
            }
        }

        [HttpGet]
        public JsonResult GetProductInPage(string param, string brand_id, string product_category_id, string page)
        {
            //string param1 = Request.Form["par;
            //string param = Request.ToString();
            object query = products.GetProductInPage(param, brand_id, product_category_id, int.Parse(page));
            return Json(new { data = query, status = 200 }, JsonRequestBehavior.AllowGet);
        }
    }
}