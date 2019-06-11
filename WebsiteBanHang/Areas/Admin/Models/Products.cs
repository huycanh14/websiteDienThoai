namespace WebsiteBanHang.Areas.Admin.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Linq;
    using WebsiteBanHang.Class;
    using System.ComponentModel;
    using System.Web;

    public partial class Products
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();

        public Products()
        {
            Order_items = new HashSet<Order_items>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string code { get; set; }

        [Required]
        [StringLength(50)]
        public string name { get; set; }

        public int product_category_id { get; set; }

        public int brand_id { get; set; }

        public double? price { get; set; }

        public int? qty { get; set; }

        [StringLength(50)]
        public string size { get; set; }

        [StringLength(50)]
        public string color { get; set; }

        //[Column(TypeName = "text")]
        public string img { get; set; }

        [Column(TypeName = "text")]
        public string description { get; set; }

        [Column(TypeName = "text")]
        public string content { get; set; }

        public DateTime created_at { get; set; }

        public DateTime? updated_at { get; set; }

        public int status { get; set; }

        public virtual Brands Brands { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Order_items> Order_items { get; set; }

        public virtual Product_categories Product_categories { get; set; }
        public int CountProduct()
        {
            int count = (from row in db.Products
                         select row).Count();
            return count;
        }

        public object GetAllProduct()
        {
            var query = (from product in db.Products
                        join product_category in db.Product_categories on product.product_category_id equals product_category.id
                        join brand in db.Brands on product.brand_id equals brand.id
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
                            product_category_name = product_category.name,
                            brand_name = brand.name,
                        }).Skip(0).Take(10);
            return query;
        }

        public object FilterProduct(string param, string brand_id, string product_category_id)
        {
            var test = new object[] { param, brand_id, product_category_id };
            var query = new object();
            if(brand_id != "null" && product_category_id == "null")
            {
                query = from product in db.Products
                        join product_category in db.Product_categories on product.product_category_id equals product_category.id
                        join brand in db.Brands on product.brand_id equals brand.id
                        where (product.name.Contains(param)) && product.brand_id == int.Parse(brand_id)
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
                            product_category_name = product_category.name,
                            brand_name = brand.name
                        };
            } 
            else if(brand_id == "null" && product_category_id != "null")
            {
                query = from product in db.Products
                            join product_category in db.Product_categories on product.product_category_id equals product_category.id
                            join brand in db.Brands on product.brand_id equals brand.id
                            where (product.name.Contains(param)) && product.product_category_id == int.Parse(product_category_id)
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
                                product_category_name = product_category.name,
                                brand_name = brand.name
                            };
            }
            else if(brand_id != "null" && product_category_id != "null")
            {
                query = from product in db.Products
                            join product_category in db.Product_categories on product.product_category_id equals product_category.id
                            join brand in db.Brands on product.brand_id equals brand.id
                            where (product.name.Contains(param)) && product.product_category_id == int.Parse(product_category_id) && product.brand_id == int.Parse(brand_id)
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
                                product_category_name = product_category.name,
                                brand_name = brand.name
                            };
            }
            else
            {
                query = (from product in db.Products
                            join product_category in db.Product_categories on product.product_category_id equals product_category.id
                            join brand in db.Brands on product.brand_id equals brand.id
                            where (product.name.Contains(param))
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
                                product_category_name = product_category.name,
                                brand_name = brand.name
                            }).Skip(0).Take(10);
            }
            return query;
        }

        public object GetProductInPage(string param, string brand_id, string product_category_id, int page)
        {
            var test = new object[] { param, brand_id, product_category_id };
            var query = new object();
            if (brand_id != "null" && product_category_id == "null")
            {
                query = (from product in db.Products
                        join product_category in db.Product_categories on product.product_category_id equals product_category.id
                        join brand in db.Brands on product.brand_id equals brand.id
                        where (product.name.Contains(param)) && product.brand_id == int.Parse(brand_id)
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
                            product_category_name = product_category.name,
                            brand_name = brand.name
                        }).Skip(page * 10 - 10).Take(10);
            }
            else if (brand_id == "null" && product_category_id != "null")
            {
                query = (from product in db.Products
                        join product_category in db.Product_categories on product.product_category_id equals product_category.id
                        join brand in db.Brands on product.brand_id equals brand.id
                        where (product.name.Contains(param)) && product.product_category_id == int.Parse(product_category_id)
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
                            product_category_name = product_category.name,
                            brand_name = brand.name
                        }).Skip(page * 10 - 10).Take(10);
            }
            else if (brand_id != "null" && product_category_id != "null")
            {
                query = (from product in db.Products
                        join product_category in db.Product_categories on product.product_category_id equals product_category.id
                        join brand in db.Brands on product.brand_id equals brand.id
                        where (product.name.Contains(param)) && product.product_category_id == int.Parse(product_category_id) && product.brand_id == int.Parse(brand_id)
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
                            product_category_name = product_category.name,
                            brand_name = brand.name
                        }).Skip(page * 10 - 10).Take(10);
            }
            else
            {
                query = (from product in db.Products
                        join product_category in db.Product_categories on product.product_category_id equals product_category.id
                        join brand in db.Brands on product.brand_id equals brand.id
                        where (product.name.Contains(param))
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
                            product_category_name = product_category.name,
                            brand_name = brand.name
                        }).Skip(page * 10 - 10).Take(10);
            }
            return query;
        }

        public int CountFilterProduct(string param, string brand_id, string product_category_id)
        {
            var test = new object[] { param, brand_id, product_category_id };
            int query = 0;
            if (brand_id != "null" && product_category_id == "null")
            {
                query = (from product in db.Products
                         join product_category in db.Product_categories on product.product_category_id equals product_category.id
                         join brand in db.Brands on product.brand_id equals brand.id
                         where (product.name.Contains(param)) && product.brand_id == int.Parse(brand_id)
                         select product).Count();
            }
            else if (brand_id == "null" && product_category_id != "null")
            {
                query = (from product in db.Products
                         join product_category in db.Product_categories on product.product_category_id equals product_category.id
                         join brand in db.Brands on product.brand_id equals brand.id
                         where (product.name.Contains(param)) && product.product_category_id == int.Parse(product_category_id)
                         select product).Count();
            }
            else if (brand_id != "null" && product_category_id != "null")
            {
                query = (from product in db.Products
                         join product_category in db.Product_categories on product.product_category_id equals product_category.id
                         join brand in db.Brands on product.brand_id equals brand.id
                         where (product.name.Contains(param)) && product.product_category_id == int.Parse(product_category_id) && product.brand_id == int.Parse(brand_id)
                         select product).Count();
            }
            else
            {
                query = (from product in db.Products
                         join product_category in db.Product_categories on product.product_category_id equals product_category.id
                         join brand in db.Brands on product.brand_id equals brand.id
                         where (product.name.Contains(param))
                         select product).Count();
            }
            return query;
        }

        public bool UniqueCode(string code, int id)
        {
            int count = (from row in db.Products
                         where row.code == code && row.id != id
                         select row).Count();
            if (count > 0) return false;
            return true; //don't have coe => true
        }

        public object InsertProduct(Products product)
        {
            try
            {
                Product pd = new Product {
                    code = product.code,
                    name = product.name,
                    product_category_id = product.product_category_id,
                    brand_id = product.brand_id,
                    price = product.price,
                    qty = product.qty,
                    size = product.size,
                    color = product.color,
                    img = product.img,
                    created_at = DateTime.Now,
                    description = product.description,
                    content = product.content,
                    status = product.status
                };
               
                db.Products.InsertOnSubmit(pd);
                db.SubmitChanges();
                return "true";
            }
            catch(Exception ex)
            {
                return ex;
            }
        }

        public Products GetProducts(int id)
        {
            var query = (from pd in db.Products
                        where pd.id == id
                        select pd).Take(1);
            Products product = new Products();
            var test = query;
            foreach(var pd in query)
            {
                product.id = pd.id;
                product.code = pd.code;
                product.name = pd.name;
                product.product_category_id = pd.product_category_id;
                product.brand_id = pd.brand_id;
                product.price = pd.price;
                product.qty = pd.qty;
                product.size = pd.size;
                product.color = pd.color;
                product.img = pd.img;
                product.description = pd.description;
                product.content = pd.content;
                product.status = pd.status;

            }
            return product;
        }

        public object UpdateProduct(Products product)
        {
            try
            {
                var query = (from pd in db.Products
                             where pd.id == product.id
                             select pd).Take(1);
                foreach (Product pr in query)
                {
                    pr.id = product.id;
                    pr.code = product.code;
                    pr.name = product.name;
                    pr.product_category_id = product.product_category_id;
                    pr.brand_id = product.brand_id;
                    pr.price = product.price;
                    pr.qty = product.qty;
                    pr.size = product.size;
                    pr.color = product.color;
                    pr.img = product.img;
                    pr.updated_at = DateTime.Now;
                    pr.description = product.description;
                    pr.content = product.content;
                    pr.status = product.status;
                };

                //db.Products.InsertOnSubmit(pd);
                db.SubmitChanges();
                return "true";
            }
            catch (Exception ex)
            {
                return ex;
            }
        }

        public bool DeleteProduct(int id)
        {
            try
            {
                var query = (from product in db.Products
                             where product.id == id
                             select product).FirstOrDefault();
                if (query != null)
                {
                    db.Products.DeleteOnSubmit(query);
                    db.SubmitChanges();
                    return true;
                }
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }
    }
}
