namespace WebsiteBanHang.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Linq;
    using WebsiteBanHang.Class;
    public partial class Products
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        public int id { get; set; }

        [Required]
        [StringLength(100)]
        public string code { get; set; }

        [Required]
        [StringLength(250)]
        public string name { get; set; }

        public int product_category_id { get; set; }

        public int brand_id { get; set; }

        public double? price { get; set; }

        public int? qty { get; set; }

        [StringLength(100)]
        public string size { get; set; }

        [StringLength(200)]
        public string color { get; set; }

        [Column(TypeName = "text")]
        public string img { get; set; }

        public string description { get; set; }

        public string content { get; set; }

        public DateTime created_at { get; set; }

        public DateTime? updated_at { get; set; }

        public int status { get; set; }

        public object GetProductNew()
        {
            var query = (from product in db.Products
                        orderby product.created_at descending
                        select new
                        {
                            id = product.id,
                            code = product.code,
                            name = product.name,
                            product_category_id = product.product_category_id,
                            brand_id = product.brand_id,
                            price = product.price,
                            qty = product.qty,
                            size = product.size,
                            color = product.color,
                            img = product.img,
                        }).Take(8);
            return query;
        }

        public object GetProductInPageByBrand(int brand, int page)
        {
            var query = (from product in db.Products
                     where product.brand_id == brand
                     select new
                     {
                         id = product.id,
                         code = product.code,
                         name = product.name,
                         product_category_id = product.product_category_id,
                         brand_id = product.brand_id,
                         price = product.price,
                         qty = product.qty,
                         size = product.size,
                         color = product.color,
                         img = product.img
                     }).Skip(page * 8 - 8).Take(8);
            return query;
        }

        public int CountProductInBrand(int brand)
        {
            int count = (from product in db.Products
                         where product.brand_id == brand
                         select product).Count();
            return count;
        }

        public object SearchProductNoCategory(string keyword, int page)
        {
            var query = (from product in db.Products
                         where product.name.Contains(keyword)
                         select new
                         {
                             id = product.id,
                             code = product.code,
                             name = product.name,
                             product_category_id = product.product_category_id,
                             brand_id = product.brand_id,
                             price = product.price,
                             qty = product.qty,
                             size = product.size,
                             color = product.color,
                             img = product.img
                         }).Skip(page * 8 - 8).Take(8);
            return query;
        }
        public int CountSearchProductNoCategory(string keyword)
        {
            int count = (from product in db.Products
                         where product.name.Contains(keyword)
                         select product).Count();
            return count;
        }
        public object SearchProductHasCategory(int category, string keyword, int page)
        {
            var query = (from product in db.Products
                         where product.name.Contains(keyword) && product.product_category_id == category
                         select new
                         {
                             id = product.id,
                             code = product.code,
                             name = product.name,
                             product_category_id = product.product_category_id,
                             brand_id = product.brand_id,
                             price = product.price,
                             qty = product.qty,
                             size = product.size,
                             color = product.color,
                             img = product.img
                         }).Skip(page * 8 - 8).Take(8);
            return query;
        }

        public int CountSearchProductHasCategory(int category, string keyword)
        {
            int count = (from product in db.Products
                         where product.name.Contains(keyword) && product.product_category_id == category
                         select product).Count();
            return count;
        }

        public object GetProduct(int id)
        {
            var query = from product in db.Products
                         where product.id == id
                         select new
                         {
                             id = product.id,
                             code = product.code,
                             name = product.name,
                             product_category_id = product.product_category_id,
                             brand_id = product.brand_id,
                             price = product.price,
                             qty = product.qty,
                             description = product.description,
                             content = product.content,
                             size = product.size,
                             color = product.color,
                             img = product.img
                         };
            return query;
        }
    }
}
