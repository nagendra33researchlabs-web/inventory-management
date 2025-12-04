/*
  # Inventory Management System Schema

  ## Overview
  Creates the database structure for an inventory management dashboard including
  stores, categories, products, and activity metrics.

  ## New Tables
  
  ### `stores`
  - `id` (uuid, primary key) - Unique store identifier
  - `name` (text) - Store name
  - `location` (text) - Store location/city
  - `items_count` (integer) - Number of items in store
  - `revenue` (integer) - Store revenue
  - `created_at` (timestamptz) - Store creation timestamp
  
  ### `categories`
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text) - Category name
  - `icon_name` (text) - Icon identifier for display
  - `items_count` (integer) - Number of items in category
  - `created_at` (timestamptz) - Category creation timestamp
  
  ### `products`
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product name
  - `category_id` (uuid) - Reference to category
  - `stock_count` (integer) - Current stock level
  - `created_at` (timestamptz) - Product creation timestamp
  
  ### `sales_data`
  - `id` (uuid, primary key) - Unique record identifier
  - `status` (text) - Sales status (Confirmed, Picked, Prebilled, Shipped)
  - `count` (integer) - Number of sales
  - `date` (date) - Sales date
  - `created_at` (timestamptz) - Record creation timestamp
  
  ### `activity_metrics`
  - `id` (uuid, primary key) - Unique metric identifier
  - `new_items` (integer) - Count of new items
  - `items_sold` (integer) - Count of items sold
  - `new_users` (integer) - Count of new users
  - `messages` (integer) - Count of messages
  - `reviews` (integer) - Count of reviews
  - `date` (date) - Metrics date
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to read all data
  - Add policies for authenticated users to manage their data
*/

-- Create stores table
CREATE TABLE IF NOT EXISTS stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  items_count integer DEFAULT 0,
  revenue integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon_name text NOT NULL,
  items_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  stock_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create sales_data table
CREATE TABLE IF NOT EXISTS sales_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status text NOT NULL,
  count integer DEFAULT 0,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Create activity_metrics table
CREATE TABLE IF NOT EXISTS activity_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  new_items integer DEFAULT 0,
  items_sold integer DEFAULT 0,
  new_users integer DEFAULT 0,
  messages integer DEFAULT 0,
  reviews integer DEFAULT 0,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_metrics ENABLE ROW LEVEL SECURITY;

-- Policies for stores
CREATE POLICY "Anyone can view stores"
  ON stores FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage stores"
  ON stores FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for categories
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for products
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage products"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for sales_data
CREATE POLICY "Anyone can view sales data"
  ON sales_data FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage sales data"
  ON sales_data FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for activity_metrics
CREATE POLICY "Anyone can view activity metrics"
  ON activity_metrics FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage activity metrics"
  ON activity_metrics FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample data for demonstration

-- Categories
INSERT INTO categories (name, icon_name, items_count) VALUES
  ('Fashion', 'shirt', 156),
  ('Electronics', 'smartphone', 89),
  ('Home & Garden', 'home', 234),
  ('Sports', 'bike', 67),
  ('Books', 'book', 345),
  ('Toys', 'baby', 123)
ON CONFLICT DO NOTHING;

-- Stores
INSERT INTO stores (name, location, items_count, revenue) VALUES
  ('Warehouse A', 'Washington', 523, 89000),
  ('Hardside U.S.', 'Washington', 245, 123000),
  ('Retail US', 'Baltimore', 678, 56000),
  ('Landmark', 'Baltimore', 234, 45000)
ON CONFLICT DO NOTHING;

-- Sales data
INSERT INTO sales_data (status, count, date) VALUES
  ('Confirmed', 45, CURRENT_DATE),
  ('Picked', 52, CURRENT_DATE),
  ('Prebilled', 38, CURRENT_DATE),
  ('Shipped', 68, CURRENT_DATE)
ON CONFLICT DO NOTHING;

-- Activity metrics
INSERT INTO activity_metrics (new_items, items_sold, new_users, messages, reviews, date) VALUES
  (741, 123, 12, 1, 4, CURRENT_DATE)
ON CONFLICT DO NOTHING;