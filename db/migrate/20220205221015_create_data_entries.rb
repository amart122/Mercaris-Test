class CreateDataEntries < ActiveRecord::Migration[6.1]
  def change
    create_table :data_entries do |t|
      t.string 'contract'
      t.date 'transaction_date'
      t.decimal 'price'
      t.decimal 'quantity'
      t.timestamps
    end
  end
end
