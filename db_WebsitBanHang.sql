USE [master]
GO
/****** Object:  Database [db_WebsitBanHang]    Script Date: 12/06/2019 14:18:34 ******/
CREATE DATABASE [db_WebsitBanHang]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'db_WebsitBanHang', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\db_WebsitBanHang.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'db_WebsitBanHang_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\db_WebsitBanHang_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [db_WebsitBanHang] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [db_WebsitBanHang].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [db_WebsitBanHang] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET ARITHABORT OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [db_WebsitBanHang] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [db_WebsitBanHang] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET  DISABLE_BROKER 
GO
ALTER DATABASE [db_WebsitBanHang] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [db_WebsitBanHang] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [db_WebsitBanHang] SET  MULTI_USER 
GO
ALTER DATABASE [db_WebsitBanHang] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [db_WebsitBanHang] SET DB_CHAINING OFF 
GO
ALTER DATABASE [db_WebsitBanHang] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [db_WebsitBanHang] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [db_WebsitBanHang] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [db_WebsitBanHang] SET QUERY_STORE = OFF
GO
USE [db_WebsitBanHang]
GO
/****** Object:  Table [dbo].[Admins]    Script Date: 12/06/2019 14:18:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Admins](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[email] [nvarchar](100) NOT NULL,
	[fullname] [nvarchar](100) NOT NULL,
	[password] [nvarchar](100) NOT NULL,
	[gender] [int] NOT NULL,
	[date_of_birth] [date] NOT NULL,
	[phone] [nvarchar](15) NOT NULL,
	[address] [nvarchar](100) NOT NULL,
	[created_at] [datetime] NOT NULL,
	[updated_at] [datetime] NULL,
	[status] [int] NOT NULL,
 CONSTRAINT [PK_Admins] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Brands]    Script Date: 12/06/2019 14:18:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Brands](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[description] [nvarchar](max) NULL,
	[created_at] [datetime] NOT NULL,
	[updated_at] [datetime] NULL,
	[status] [int] NOT NULL,
 CONSTRAINT [PK_Brands] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customers]    Script Date: 12/06/2019 14:18:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[email] [nvarchar](100) NOT NULL,
	[fullname] [nvarchar](100) NOT NULL,
	[password] [nvarchar](100) NOT NULL,
	[gender] [int] NOT NULL,
	[date_of_birth] [date] NULL,
	[phone] [nvarchar](15) NULL,
	[address] [nvarchar](100) NULL,
	[created_at] [datetime] NOT NULL,
	[updated_at] [datetime] NULL,
	[status] [int] NOT NULL,
 CONSTRAINT [PK_Customers] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order_items]    Script Date: 12/06/2019 14:18:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order_items](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NOT NULL,
	[product_id] [int] NOT NULL,
	[code] [nvarchar](100) NOT NULL,
	[qty] [int] NOT NULL,
	[price] [float] NOT NULL,
	[total]  AS ([qty]*[price]),
	[size] [nvarchar](100) NULL,
	[color] [nvarchar](200) NULL,
 CONSTRAINT [PK_Order_items] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 12/06/2019 14:18:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[qty] [int] NOT NULL,
	[price] [float] NOT NULL,
	[customer_id] [int] NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[phone] [nvarchar](15) NOT NULL,
	[address] [nvarchar](200) NOT NULL,
	[created_at] [datetime] NOT NULL,
	[updated_at] [datetime] NULL,
	[status] [int] NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_categories]    Script Date: 12/06/2019 14:18:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_categories](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[description] [nvarchar](max) NULL,
	[created_at] [datetime] NOT NULL,
	[updated_at] [datetime] NULL,
	[status] [int] NOT NULL,
 CONSTRAINT [PK_Product_categories] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 12/06/2019 14:18:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[code] [nvarchar](100) NOT NULL,
	[name] [nvarchar](250) NOT NULL,
	[product_category_id] [int] NOT NULL,
	[brand_id] [int] NOT NULL,
	[price] [float] NULL,
	[qty] [int] NULL,
	[size] [nvarchar](100) NULL,
	[color] [nvarchar](200) NULL,
	[img] [text] NULL,
	[description] [nvarchar](max) NULL,
	[content] [nvarchar](max) NULL,
	[created_at] [datetime] NOT NULL,
	[updated_at] [datetime] NULL,
	[status] [int] NOT NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Admins] ON 

INSERT [dbo].[Admins] ([id], [email], [fullname], [password], [gender], [date_of_birth], [phone], [address], [created_at], [updated_at], [status]) VALUES (1, N'huycanh14@gmail.com', N'Đặng Huy Cảnh', N'123456', 1, CAST(N'1998-07-14' AS Date), N'0357572157', N'Hà Nội', CAST(N'2019-05-27T01:17:20.703' AS DateTime), CAST(N'2019-05-27T01:17:20.703' AS DateTime), 1)
INSERT [dbo].[Admins] ([id], [email], [fullname], [password], [gender], [date_of_birth], [phone], [address], [created_at], [updated_at], [status]) VALUES (3, N'tuananh@gmail.com', N'Tuấn Anh', N'1234567890', 1, CAST(N'1998-06-02' AS Date), N'0987654321', N'Hà Nội', CAST(N'2019-06-02T14:49:30.930' AS DateTime), NULL, 1)
SET IDENTITY_INSERT [dbo].[Admins] OFF
SET IDENTITY_INSERT [dbo].[Brands] ON 

INSERT [dbo].[Brands] ([id], [name], [description], [created_at], [updated_at], [status]) VALUES (1, N'Samsung', N'', CAST(N'2019-05-27T01:18:56.807' AS DateTime), CAST(N'2019-05-29T17:16:17.297' AS DateTime), 1)
INSERT [dbo].[Brands] ([id], [name], [description], [created_at], [updated_at], [status]) VALUES (2, N'Iphone', NULL, CAST(N'2019-05-27T01:19:02.463' AS DateTime), CAST(N'2019-05-27T01:19:02.463' AS DateTime), 1)
INSERT [dbo].[Brands] ([id], [name], [description], [created_at], [updated_at], [status]) VALUES (3, N'Oppo', NULL, CAST(N'2019-05-27T08:39:37.920' AS DateTime), CAST(N'2019-05-27T08:39:37.920' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Brands] OFF
SET IDENTITY_INSERT [dbo].[Customers] ON 

INSERT [dbo].[Customers] ([id], [email], [fullname], [password], [gender], [date_of_birth], [phone], [address], [created_at], [updated_at], [status]) VALUES (1, N'anhnguyentuan2212@gmail.com', N'Nguyễn Tuấn Anh', N'123', 1, CAST(N'1998-12-22' AS Date), N'0358805333', N'18 Phố Viên, Hà Nội', CAST(N'2019-05-27T01:20:27.197' AS DateTime), CAST(N'2019-05-27T01:20:27.197' AS DateTime), 1)
INSERT [dbo].[Customers] ([id], [email], [fullname], [password], [gender], [date_of_birth], [phone], [address], [created_at], [updated_at], [status]) VALUES (2, N'huycanh14@gmail.com', N'Đặng Huy Cảnh', N'1234567890', 1, CAST(N'1998-07-14' AS Date), N'0165757215', N'Nam Định', CAST(N'2019-06-11T07:23:33.827' AS DateTime), CAST(N'2019-06-11T09:58:41.777' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Customers] OFF
SET IDENTITY_INSERT [dbo].[Order_items] ON 

INSERT [dbo].[Order_items] ([id], [order_id], [product_id], [code], [qty], [price], [size], [color]) VALUES (1, 1, 1, N'dt01', 1, 18000000, NULL, NULL)
INSERT [dbo].[Order_items] ([id], [order_id], [product_id], [code], [qty], [price], [size], [color]) VALUES (2, 2, 2, N'dt02', 1, 20000000, NULL, NULL)
INSERT [dbo].[Order_items] ([id], [order_id], [product_id], [code], [qty], [price], [size], [color]) VALUES (3, 8, 10, N'dt09', 1, 3090000, N'32G', N'Đỏ')
INSERT [dbo].[Order_items] ([id], [order_id], [product_id], [code], [qty], [price], [size], [color]) VALUES (4, 8, 9, N'dt08', 1, 6990000, N'64G', N'Đen')
INSERT [dbo].[Order_items] ([id], [order_id], [product_id], [code], [qty], [price], [size], [color]) VALUES (5, 8, 17, N'tn15', 1, 1450000, N'0', N'Đen')
INSERT [dbo].[Order_items] ([id], [order_id], [product_id], [code], [qty], [price], [size], [color]) VALUES (6, 8, 22, N'tn08', 1, 280000, N'xl', N'')
INSERT [dbo].[Order_items] ([id], [order_id], [product_id], [code], [qty], [price], [size], [color]) VALUES (7, 15, 22, N'tn08', 1, 280000, N'xl', N'')
INSERT [dbo].[Order_items] ([id], [order_id], [product_id], [code], [qty], [price], [size], [color]) VALUES (8, 15, 18, N'tn16', 1, 850000, N'0', N'Trắng')
INSERT [dbo].[Order_items] ([id], [order_id], [product_id], [code], [qty], [price], [size], [color]) VALUES (9, 15, 17, N'tn15', 1, 1450000, N'0', N'Đen')
SET IDENTITY_INSERT [dbo].[Order_items] OFF
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([id], [qty], [price], [customer_id], [name], [phone], [address], [created_at], [updated_at], [status]) VALUES (1, 1, 18000000, 1, N'Nguyễn Văn Thành', N'0358805333', N'Phú Xuyên - Hà Nội', CAST(N'2019-05-27T08:36:29.320' AS DateTime), CAST(N'2019-05-31T22:56:21.333' AS DateTime), 0)
INSERT [dbo].[Orders] ([id], [qty], [price], [customer_id], [name], [phone], [address], [created_at], [updated_at], [status]) VALUES (2, 1, 20000000, 1, N'Nguyễn Văn Thành', N'0358805333', N'Phú Xuyên - Hà Nội', CAST(N'2019-05-27T08:36:53.723' AS DateTime), CAST(N'2019-05-27T08:36:53.723' AS DateTime), 1)
INSERT [dbo].[Orders] ([id], [qty], [price], [customer_id], [name], [phone], [address], [created_at], [updated_at], [status]) VALUES (8, 3, 2580000, 2, N'Đặng Huy Cảnh', N'0165757215', N'Nam Định', CAST(N'2019-06-11T16:16:01.993' AS DateTime), NULL, 0)
INSERT [dbo].[Orders] ([id], [qty], [price], [customer_id], [name], [phone], [address], [created_at], [updated_at], [status]) VALUES (15, 3, 2580000, 2, N'Đặng Huy Cảnh', N'0165757215', N'Nam Định', CAST(N'2019-06-11T16:36:32.340' AS DateTime), CAST(N'2019-06-11T16:36:55.690' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Orders] OFF
SET IDENTITY_INSERT [dbo].[Product_categories] ON 

INSERT [dbo].[Product_categories] ([id], [name], [description], [created_at], [updated_at], [status]) VALUES (1, N'Điện thoại', N'', CAST(N'2019-05-27T08:38:19.890' AS DateTime), CAST(N'2019-05-31T09:27:19.460' AS DateTime), 1)
INSERT [dbo].[Product_categories] ([id], [name], [description], [created_at], [updated_at], [status]) VALUES (2, N'Tai nghe', NULL, CAST(N'2019-05-27T08:38:33.510' AS DateTime), CAST(N'2019-05-27T08:38:33.510' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Product_categories] OFF
SET IDENTITY_INSERT [dbo].[Products] ON 

INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (1, N'dt01', N'OPPO F11', 1, 3, 18000000, 10, N'64GB', NULL, N'oppo-f11-mtp-400x460.png', NULL, NULL, CAST(N'2019-05-27T08:40:12.193' AS DateTime), CAST(N'2019-05-27T08:40:12.193' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (2, N'dt02', N'Samsung Galaxy Note 8', 1, 2, 20000000, 10, N'64GB', NULL, N'samsung-galaxy-note8-black-400x460.png', NULL, NULL, CAST(N'2019-05-27T08:40:30.860' AS DateTime), CAST(N'2019-05-27T08:40:30.860' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (3, N'dt03', N'iPhone Xs Max 64GB', 1, 2, 29990000, 10, N'64GB', N'Đen', N'iphone-xs-max-gray-400x460.png', NULL, NULL, CAST(N'2019-05-27T08:42:39.707' AS DateTime), CAST(N'2019-05-27T08:42:39.707' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (5, N'dt04', N'iPhone 6s Plus 32GB', 1, 2, 8990000, 20, N'32G', N'Trắng', N'iphone-6s-plus-32gb-400x460.png', NULL, NULL, CAST(N'2019-06-01T00:44:01.470' AS DateTime), CAST(N'2019-06-01T00:44:01.470' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (6, N'dt05', N'iPhone 8 Plus 64GB', 1, 2, 18990000, 20, N'64G', N'Trắng', N'iphone-8-plus-1-400x460.png', NULL, NULL, CAST(N'2019-06-01T00:44:01.470' AS DateTime), CAST(N'2019-06-01T00:44:01.470' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (7, N'dt06', N'iPhone 7 32GB', 1, 2, 10990000, 20, N'32G', N'Đen', N'iphone-7-32gb-den-400x460.png', NULL, NULL, CAST(N'2019-06-01T00:44:01.470' AS DateTime), CAST(N'2019-06-01T00:44:01.470' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (8, N'dt07', N'iPhone 7 Plus 32G', 1, 2, 12990000, 20, N'32G', N'Đen', N'iphone-7-plus-gold-400x460.png', NULL, NULL, CAST(N'2019-06-01T00:44:24.123' AS DateTime), CAST(N'2019-06-01T00:44:24.123' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (9, N'dt08', N'Samsung Galaxy A50 64GB', 1, 1, 6990000, 30, N'64G', N'Đen', N'samsung-galaxy-a50-black-1-400x460.png', NULL, NULL, CAST(N'2019-06-01T00:51:20.690' AS DateTime), CAST(N'2019-06-01T00:51:20.690' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (10, N'dt09', N'Samsung Galaxy A10', 1, 1, 3090000, 30, N'32G', N'Đỏ', N'samsung-galaxy-a10-red-docquyen-400x460.png', NULL, NULL, CAST(N'2019-06-01T00:51:20.690' AS DateTime), CAST(N'2019-06-01T00:51:20.690' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (11, N'dt10', N'Samsung Galaxy A70', 1, 1, 9290000, 30, N'128G', N'Đen', N'samsung-galaxy-a70-black-400x460.png', NULL, NULL, CAST(N'2019-06-01T00:51:20.690' AS DateTime), CAST(N'2019-06-01T00:51:20.690' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (12, N'dt11', N'Samsung Galaxy A9 (2018)', 1, 1, 7990000, 30, N'128G', N'Xanh Dương', N'samsung-galaxy-a9-2018-blue-400x460.png', NULL, NULL, CAST(N'2019-06-01T00:51:20.690' AS DateTime), CAST(N'2019-06-01T00:51:20.690' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (13, N'dt12', N'Samsung Galaxy Note 8', 1, 1, 11990000, 30, N'64G', N'Đen', N'samsung-galaxy-note8-black-400x460 (1).png', NULL, NULL, CAST(N'2019-06-01T00:51:20.690' AS DateTime), CAST(N'2019-06-01T00:51:20.690' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (14, N'dt13', N'Samsung Galaxy M20', 1, 1, 4690000, 30, N'32G', N'Xanh Dương', N'samsung-galaxy-m20-400x460.png', NULL, NULL, CAST(N'2019-06-01T00:51:20.690' AS DateTime), CAST(N'2019-06-01T00:51:20.690' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (15, N'dt14', N'Samsung Galaxy A50 128GB', 1, 1, 7990000, 30, N'128G', N'Xanh Dương', N'samsung-galaxy-a50-128gb-blue-400x460.png', NULL, NULL, CAST(N'2019-06-01T00:51:20.690' AS DateTime), CAST(N'2019-06-01T00:51:20.690' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (16, N'tn14', N'Tai nghe nhét trong Samsung EG920B', 2, 1, 280000, 30, N'1.2m', N'Đen', N'tai-nghe-nhet-trong-samsung-eg920b-2-1-600x600.jpg', NULL, NULL, CAST(N'2019-06-01T00:53:41.073' AS DateTime), CAST(N'2019-06-01T00:53:41.073' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (17, N'tn15', N'Tai nghe Bluetooth Samsung Level U Pro BN920C', 2, 1, 1450000, 30, N'0', N'Đen', N'tai-nghe-bluetooth-samsung-level-u-pro-bn920c-avatar-1-600x600.jpg', NULL, NULL, CAST(N'2019-06-01T00:53:41.077' AS DateTime), CAST(N'2019-06-01T00:53:41.077' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (18, N'tn16', N'Tai nghe Bluetooth Samsung MG900E', 2, 1, 850000, 30, N'0', N'Trắng', N'tai-nghe-bluetooth-samsung-mg900e-avatar-1-600x600.jpg', NULL, NULL, CAST(N'2019-06-01T00:53:41.077' AS DateTime), CAST(N'2019-06-01T00:53:41.077' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (19, N'dt17', N'OPPO R17 Pro', 1, 3, 13990000, 30, N'128G', N'Tím', N'oppo-r17-pro-2-400x460.png', NULL, NULL, CAST(N'2019-06-01T00:53:41.077' AS DateTime), CAST(N'2019-06-01T00:53:41.077' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (20, N'dt18', N'OPPO F11 Pro 128GB Xám Tinh Vân', 1, 3, 8490000, 30, N'128G', N'Xám', N'oppo-f11-pro-xam-128gb-docquyen-400x460.png', NULL, NULL, CAST(N'2019-06-01T00:53:41.077' AS DateTime), CAST(N'2019-06-01T00:53:41.077' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (21, N'dt19', N'OPPO F11 Pro 64GB', 1, 3, 8490000, 30, N'64G', N'Xanh Lá', N'oppo-f11-pro-green-2nambh-400x460.png', NULL, NULL, CAST(N'2019-06-01T00:53:41.077' AS DateTime), CAST(N'2019-06-01T00:53:41.077' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [code], [name], [product_category_id], [brand_id], [price], [qty], [size], [color], [img], [description], [content], [created_at], [updated_at], [status]) VALUES (22, N'tn08', N'Tai nghe nhét trong Samsung EG920B', 2, 1, 280000, 10, N'xl', NULL, N'tai-nghe-nhet-trong-samsung-eg920b-2-1-600x600.jpg', N'<p><strong>Tai nghe&nbsp;</strong></p>
', NULL, CAST(N'2019-06-01T11:46:03.000' AS DateTime), NULL, 1)
SET IDENTITY_INSERT [dbo].[Products] OFF
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Admins]    Script Date: 12/06/2019 14:18:35 ******/
ALTER TABLE [dbo].[Admins] ADD  CONSTRAINT [IX_Admins] UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Customers]    Script Date: 12/06/2019 14:18:35 ******/
ALTER TABLE [dbo].[Customers] ADD  CONSTRAINT [IX_Customers] UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Products]    Script Date: 12/06/2019 14:18:35 ******/
ALTER TABLE [dbo].[Products] ADD  CONSTRAINT [IX_Products] UNIQUE NONCLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Admins] ADD  CONSTRAINT [DF_Admins_gender]  DEFAULT ((0)) FOR [gender]
GO
ALTER TABLE [dbo].[Admins] ADD  CONSTRAINT [DF_Admins_date_of_birth]  DEFAULT (getdate()) FOR [date_of_birth]
GO
ALTER TABLE [dbo].[Admins] ADD  CONSTRAINT [DF_Admins_created_at]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Admins] ADD  CONSTRAINT [DF_Admins_updated_at]  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Admins] ADD  CONSTRAINT [DF_Admins_status]  DEFAULT ((0)) FOR [status]
GO
ALTER TABLE [dbo].[Brands] ADD  CONSTRAINT [DF_Brands_created_at]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Brands] ADD  CONSTRAINT [DF_Brands_updated_at]  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Brands] ADD  CONSTRAINT [DF_Brands_status]  DEFAULT ((0)) FOR [status]
GO
ALTER TABLE [dbo].[Customers] ADD  CONSTRAINT [DF_Customers_gender]  DEFAULT ((0)) FOR [gender]
GO
ALTER TABLE [dbo].[Customers] ADD  CONSTRAINT [DF_Customers_date_of_birth]  DEFAULT (getdate()) FOR [date_of_birth]
GO
ALTER TABLE [dbo].[Customers] ADD  CONSTRAINT [DF_Customers_created_at]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Customers] ADD  CONSTRAINT [DF_Customers_updated_at]  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Customers] ADD  CONSTRAINT [DF_Customers_status]  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[Orders] ADD  CONSTRAINT [DF_Orders_created_at]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Orders] ADD  CONSTRAINT [DF_Orders_updated_at]  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Orders] ADD  CONSTRAINT [DF_Orders_status]  DEFAULT ((0)) FOR [status]
GO
ALTER TABLE [dbo].[Product_categories] ADD  CONSTRAINT [DF_Product_categories_created_at]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Product_categories] ADD  CONSTRAINT [DF_Product_categories_updated_at]  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Product_categories] ADD  CONSTRAINT [DF_Product_categories_status]  DEFAULT ((0)) FOR [status]
GO
ALTER TABLE [dbo].[Products] ADD  CONSTRAINT [DF_Products_created_at]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Products] ADD  CONSTRAINT [DF_Products_updated_at]  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Products] ADD  CONSTRAINT [DF_Products_status]  DEFAULT ((0)) FOR [status]
GO
ALTER TABLE [dbo].[Order_items]  WITH CHECK ADD  CONSTRAINT [FK_Order_items_Orders] FOREIGN KEY([order_id])
REFERENCES [dbo].[Orders] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Order_items] CHECK CONSTRAINT [FK_Order_items_Orders]
GO
ALTER TABLE [dbo].[Order_items]  WITH CHECK ADD  CONSTRAINT [FK_Order_items_Products] FOREIGN KEY([product_id])
REFERENCES [dbo].[Products] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Order_items] CHECK CONSTRAINT [FK_Order_items_Products]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Customers] FOREIGN KEY([customer_id])
REFERENCES [dbo].[Customers] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Customers]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Brands] FOREIGN KEY([brand_id])
REFERENCES [dbo].[Brands] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Brands]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Product_categories] FOREIGN KEY([product_category_id])
REFERENCES [dbo].[Product_categories] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Product_categories]
GO
ALTER TABLE [dbo].[Admins]  WITH CHECK ADD  CONSTRAINT [CK_Admins] CHECK  (([date_of_birth]<=getdate()))
GO
ALTER TABLE [dbo].[Admins] CHECK CONSTRAINT [CK_Admins]
GO
ALTER TABLE [dbo].[Admins]  WITH CHECK ADD  CONSTRAINT [CK_Admins_1] CHECK  (([created_at]<=getdate()))
GO
ALTER TABLE [dbo].[Admins] CHECK CONSTRAINT [CK_Admins_1]
GO
ALTER TABLE [dbo].[Admins]  WITH CHECK ADD  CONSTRAINT [CK_Admins_2] CHECK  (([updated_at]<=getdate()))
GO
ALTER TABLE [dbo].[Admins] CHECK CONSTRAINT [CK_Admins_2]
GO
ALTER TABLE [dbo].[Brands]  WITH CHECK ADD  CONSTRAINT [CK_Brands] CHECK  (([created_at]<=getdate()))
GO
ALTER TABLE [dbo].[Brands] CHECK CONSTRAINT [CK_Brands]
GO
ALTER TABLE [dbo].[Brands]  WITH CHECK ADD  CONSTRAINT [CK_Brands_1] CHECK  (([updated_at]<=getdate()))
GO
ALTER TABLE [dbo].[Brands] CHECK CONSTRAINT [CK_Brands_1]
GO
ALTER TABLE [dbo].[Customers]  WITH CHECK ADD  CONSTRAINT [CK_Customers] CHECK  (([date_of_birth]<=getdate()))
GO
ALTER TABLE [dbo].[Customers] CHECK CONSTRAINT [CK_Customers]
GO
ALTER TABLE [dbo].[Customers]  WITH CHECK ADD  CONSTRAINT [CK_Customers_1] CHECK  (([created_at]<=getdate()))
GO
ALTER TABLE [dbo].[Customers] CHECK CONSTRAINT [CK_Customers_1]
GO
ALTER TABLE [dbo].[Customers]  WITH CHECK ADD  CONSTRAINT [CK_Customers_2] CHECK  (([updated_at]<=getdate()))
GO
ALTER TABLE [dbo].[Customers] CHECK CONSTRAINT [CK_Customers_2]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [CK_Orders] CHECK  (([created_at]<=getdate()))
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [CK_Orders]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [CK_Orders_1] CHECK  (([updated_at]<=getdate()))
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [CK_Orders_1]
GO
ALTER TABLE [dbo].[Product_categories]  WITH CHECK ADD  CONSTRAINT [CK_Product_categories] CHECK  (([updated_at]<=getdate()))
GO
ALTER TABLE [dbo].[Product_categories] CHECK CONSTRAINT [CK_Product_categories]
GO
ALTER TABLE [dbo].[Product_categories]  WITH CHECK ADD  CONSTRAINT [CK_Product_categories_1] CHECK  (([created_at]<=getdate()))
GO
ALTER TABLE [dbo].[Product_categories] CHECK CONSTRAINT [CK_Product_categories_1]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [CK_Products] CHECK  (([created_at]<=getdate()))
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [CK_Products]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [CK_Products_1] CHECK  (([updated_at]<=getdate()))
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [CK_Products_1]
GO
/****** Object:  StoredProcedure [dbo].[CountProductInBrand]    Script Date: 12/06/2019 14:18:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CountProductInBrand]
AS
SELECT Brands.id, Brands.name, COUNT(Products.brand_id) as count
FROM Brands
INNER JOIN Products ON Brands.id = Products.brand_id
GROUP BY Brands.id, Brands.name
GO
/****** Object:  StoredProcedure [dbo].[CountProductInProductCategory]    Script Date: 12/06/2019 14:18:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CountProductInProductCategory]
AS
SELECT Product_categories.id, Product_categories.name, COUNT(Products.brand_id) as count
FROM Product_categories
INNER JOIN Products ON Product_categories.id = Products.product_category_id
GROUP BY Product_categories.id, Product_categories.name
GO
/****** Object:  StoredProcedure [dbo].[GetAllBrands]    Script Date: 12/06/2019 14:18:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllBrands]
AS
select * from Brands
GO
/****** Object:  StoredProcedure [dbo].[GetAllProductCategories]    Script Date: 12/06/2019 14:18:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllProductCategories]
AS
select * from Product_categories
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Customers', @level2type=N'CONSTRAINT',@level2name=N'CK_Customers'
GO
USE [master]
GO
ALTER DATABASE [db_WebsitBanHang] SET  READ_WRITE 
GO
