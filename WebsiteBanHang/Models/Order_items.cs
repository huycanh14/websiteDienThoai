namespace WebsiteBanHang.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Linq;
    using WebsiteBanHang.Class;

    public partial class Order_items
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        public int id { get; set; }

        public int order_id { get; set; }

        public int product_id { get; set; }

        [Required]
        [StringLength(100)]
        public string code { get; set; }

        public int qty { get; set; }

        public double price { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public double total { get; set; }

        [StringLength(100)]
        public string size { get; set; }

        [StringLength(200)]
        public string color { get; set; }

        public virtual Orders Orders { get; set; }

        public virtual Products Products { get; set; }

        public int AddOrder_item(object[] value)
        {
            try
            {
                Order_item order = new Order_item();
                order.order_id = int.Parse(value[0].ToString());
                order.product_id = int.Parse(value[1].ToString());
                order.code = value[2].ToString();
                order.qty = int.Parse(value[3].ToString());
                order.price = double.Parse(value[4].ToString());
                order.size = value[5].ToString();
                order.color = value[6].ToString();
                db.Order_items.InsertOnSubmit(order);
                db.SubmitChanges();
                return order.id;

            }
            catch (Exception ex)
            {
                return 0;
            }
        }
    }
}
