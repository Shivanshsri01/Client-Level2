import frappe
@frappe.whitelist()
def export_data():
    return frappe.db.sql('''select cus.name,cus.customer_name,cus.email_id,cus.mobile_no,
                        add.address_line1,
                        add.address_line2,add.pincode,add.city,add.state,add.country
                        from `tabCustomer` cus
                        left join `tabAddress` add
                        on add.name = cus.customer_primary_address
              ''',as_list=1)  