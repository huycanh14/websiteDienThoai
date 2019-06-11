using System.Web.Mvc;

namespace WebsiteBanHang.Areas.Admin
{
    public class AdminAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Admin";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Admin_default",
                "Admin/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
            //context.MapRoute(
            //    name: "Home",
            //    url: "Admin",
            //    defaults: new { controller = "Home", action = "Index" }
            //);
            //context.MapRoute(
            //    name: "Login",
            //    url: "Admin/login",
            //    defaults: new { controller = "Home", action = "Login" }
            //);
            //context.MapRoute(
            //    name: "Logoup",
            //    url: "Admin/logoup",
            //    defaults: new { controller = "Home", action = "Logoup" }
            //);
            //context.MapRoute(
            //    name: "Index",
            //    url: "Admin/Index",
            //    defaults: new { controller = "Home", action = "Test" }
            //);
        }
    }
}