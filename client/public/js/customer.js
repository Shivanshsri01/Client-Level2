frappe.listview_settings['Customer'] = {
    onload:(listview)=>{
        listview.page.add_button('Export',()=>{
            frappe.call({       
                method:"client.client.custom.customer.export_data",
                callback:(result) => {
                    if (result.message) {
                        let data = [["Customer Name", "Customer Type", "Email id", "Mobile number", "Address Line1", "Address Line 2", "Pincode", "City", "State", "Country"]];
                        result.message.map(item=>data.push(item))
                        frappe.tools.downloadify(data, null, 'Customer');
                    }
                }
            })
        })
    }}



