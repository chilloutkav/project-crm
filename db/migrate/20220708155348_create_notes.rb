class CreateNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :notes do |t|
      t.string :title
      t.string :details
      t.belongs_to :deal, null: false, foreign_key: true

      t.timestamps
    end
  end
end
