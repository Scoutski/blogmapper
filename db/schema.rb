# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150602233937) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "blogs", force: :cascade do |t|
    t.string   "name"
    t.text     "blog_url"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "marker_url"
  end

  create_table "blogs_users", id: false, force: :cascade do |t|
    t.integer "blog_id"
    t.integer "user_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string   "name"
    t.date     "published"
    t.text     "post_url"
    t.string   "restaurant_name"
    t.text     "restaurant_loc"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "blog_id"
    t.text     "latitude"
    t.text     "longitude"
  end

  create_table "posts_users", id: false, force: :cascade do |t|
    t.integer "post_id"
    t.integer "user_id"
  end

  create_table "users", force: :cascade do |t|
    t.text     "name"
    t.string   "password_digest"
    t.boolean  "admin",           default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "fav_posts",       default: [],    array: true
    t.integer  "fav_blogs",       default: [],    array: true
  end

end
