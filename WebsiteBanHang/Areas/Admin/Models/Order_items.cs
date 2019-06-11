namespace WebsiteBanHang.Areas.Admin.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using WebsiteBanHang.Class;
    using System.Linq;

    public partial class Order_items
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        public int id { get; set; }

        public int order_id { get; set; }

        public int product_id { get; set; }

        [Column(TypeName = "text")]
        [Required]
        public string code { get; set; }

        public int qty { get; set; }

        [Column(TypeName = "money")]
        public decimal price { get; set; }

        [Column(TypeName = "money")]
        public decimal total { get; set; }

        [StringLength(50)]
        public string size { get; set; }

        [StringLength(50)]
        public string color { get; set; }

        public virtual Orders Orders { get; set; }

        public virtual Products Products { get; set; }

        public object GetListOrder_item(int order_id)
        {
            var query = from row in db.Order_items
                        join product in db.Products on row.product_id equals product.id
                        where row.order_id == order_id
                        select new
                        {
                            product_id = product.id,
                            code = row.code,
                            name = product.name,
                            qty = row.qty,
                            price = row.price,
                            total = row.total,
                            size = row.size,
                            color = row.color
                        };
            return query;
        }
    }
}
