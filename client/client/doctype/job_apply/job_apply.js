// This script defines two Frappe framework event handlers:
// 1. On the "Job Apply" form:
//    - When the "role" field changes, it shows/hides specific fields based on the selected role.
// 2. On the "Details" form:
//    - When certain fields change, it dynamically updates other fields accordingly and captures additional data.

// Event handler for the "Job Apply" form
frappe.ui.form.on("Job Apply", {
    role: function(frm) {
        // Get the selected role from the form
        var selected_role = frm.doc.role;
        // Access the fields in the "Details" grid
        var details = frm.fields_dict.details.grid.fields_map;

        // Hide all fields initially
        for (var fieldname in details) {
            details[fieldname].hidden = 1;
        }

        // Show fields based on selected role
        if (selected_role === "Developer") {
            ['language', 'framework', 'ides', 'applied_date', 'initials'].forEach(function(fieldname) {
                details[fieldname].hidden = 0;
            });
        } else if (selected_role === "QA") {
            ['testing_tools', 'bug_tracking_system', 'automation_experience', 'test_environments', 'applied_date', 'initials'].forEach(function(fieldname) {
                details[fieldname].hidden = 0;
            });
        } else {
            [ 'design_style', 'color_theory_knowledge', 'typography_skills', 'uiux_experience', 'applied_date', 'initials'].forEach(function(fieldname) {
                details[fieldname].hidden = 0;
            });
        }
    }
});

// Event handler for the "Details" form
frappe.ui.form.on("Details", {
    language: function(frm, cdt, cdn) {
        var doc = locals[cdt][cdn];
        // Automatically set the framework based on the selected language
        if (doc.language === 'Python') {
            doc.framework = "Django";
        } else if (doc.language === "JavaScript") {
            doc.framework = 'React Native';
        } else {
            doc.framework = 'Laravel';
        }
        frm.refresh_field("details");
    },
    ides: function(frm, cdt, cdn) {
        var doc = locals[cdt][cdn];
        // If IDEs field is selected, capture applied date and user initials
        if (doc.ides) {
            doc.applied_date = frappe.datetime.nowdate();
            doc.initials = frappe.user.full_name;
            frm.refresh_field("details");
        }
    },
    design_style: function(frm, cdt, cdn) {
        var doc = locals[cdt][cdn];
        // If design style field is selected, capture applied date and user initials
        if (doc.design_style) {
            doc.applied_date = frappe.datetime.nowdate();
            doc.initials = frappe.user.full_name;
        }
        frm.refresh_field("details");
    },
    test_environments: function(frm, cdt, cdn) {
        var doc = locals[cdt][cdn];
        // Capture applied date and user initials when test environments field is selected
        doc.applied_date = frappe.datetime.nowdate();
        doc.initials = frappe.user.full_name;
        frm.refresh_field("details");
    }
});
