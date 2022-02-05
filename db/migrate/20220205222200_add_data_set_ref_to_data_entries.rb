class AddDataSetRefToDataEntries < ActiveRecord::Migration[6.1]
  def change
    add_reference :data_entries, :data_set, null: false, foreign_key: true
  end
end
