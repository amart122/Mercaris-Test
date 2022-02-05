class DataSet < ApplicationRecord
    has_many :data_entries
    attr_accessor :data_set_file
    after_create :import_data_set

    require 'csv'

    private
    def import_data_set
        CSV.foreach(self.data_set_file.path, headers: true, skip_blanks: true) do |row|
            next if row.to_hash.values.all?(&:blank?)
            DataEntry.create(
                contract: row[0],
                transaction_date: Date.strptime(row[1], '%m/%d/%y'),
                quantity: row[2].to_f.round(6),
                price: row[3].to_f,
                data_set_id: self.id
            )
        end
    end
end
