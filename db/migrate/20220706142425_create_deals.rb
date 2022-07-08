class CreateDeals < ActiveRecord::Migration[7.0]
  def change
    create_table :deals do |t|
      t.string :deal_name
      t.string :deal_stage
      t.string :deal_type
      t.integer :amount
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :contact, null: false, foreign_key: true

      t.timestamps
    end
  end
end
