<!-- BEGIN PAGE BODY -->
<?php #  $this->load->view('user/pagewrapper'); ?>
<div class="page-body">
    <?php  /*****body**********/  ?>
    <?php  /****AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA**********/  ?>
    <?php  /***container Div**********/  ?>
    <div class="container-xl">
        #############
    </div>
    <?php  /***container Div**********/  ?>
    <?php  /****AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA**********/  ?>
    <?php  /****AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA**********/  ?>
    <?php  /***container Div**********/  ?>
    <div class="container-xl">
        #############
    </div>
    <?php  /***container Div**********/  ?>
    <?php  /****AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA**********/  ?>
    <?php  /****Basic forml**********/  ?>
    <div class="container-xl">
        <div class="col-md-6">
            <form class="card">
                <div class="card-header">
                    <h3 class="card-title">Basic form</h3>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label required">Email address</label>
                        <div>
                            <input type="email" class="form-control" aria-describedby="emailHelp"
                                placeholder="Enter email">
                            <small class="form-hint">We'll never share your email with anyone else.</small>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label required">Password</label>
                        <div>
                            <input type="password" class="form-control" placeholder="Password">
                            <small class="form-hint">
                                Your password must be 8-20 characters long, contain letters and numbers, and
                                must not contain
                                spaces, special characters, or emoji.
                            </small>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Select</label>
                        <div>
                            <select class="form-select">
                                <option>Option 1</option>
                                <optgroup label="Optgroup 1">
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                </optgroup>
                                <option>Option 2</option>
                                <optgroup label="Optgroup 2">
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                </optgroup>
                                <optgroup label="Optgroup 3">
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                </optgroup>
                                <option>Option 3</option>
                                <option>Option 4</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Checkboxes</label>
                        <div>
                            <label class="form-check">
                                <input class="form-check-input" type="checkbox" checked>
                                <span class="form-check-label">Option 1</span>
                            </label>
                            <label class="form-check">
                                <input class="form-check-input" type="checkbox">
                                <span class="form-check-label">Option 2</span>
                            </label>
                            <label class="form-check">
                                <input class="form-check-input" type="checkbox" disabled>
                                <span class="form-check-label">Option 3</span>
                            </label>
                        </div>
                    </div>
                    <div class="text-end">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <?php  /****Basic form**********/  ?>
    <?php  /****AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA**********/  ?>
    <?php  /****container-xl**********/  ?>
    <div class="container-xl">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">HTTP Request</h3>
                </div>
                <div class="card-body">
                    <div class="row row-cards">
                        <div class="mb-3 col-sm-4 col-md-2">
                            <label class="form-label required">Method</label>
                            <select class="form-select">
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                                <option value="HEAD">HEAD</option>
                                <option value="DELETE">DELETE</option>
                                <option value="PATCH">PATCH</option>
                            </select>
                        </div>
                        <div class="mb-3 col-sm-8 col-md-10">
                            <label class="form-label required">URL</label>
                            <input name="url" type="text" class="form-control"
                                value="https://content.googleapis.com/discovery/v1/apis/surveys/v2/rest">
                        </div>
                    </div>
                    <div class="form-label">Assertions</div>
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <th>Source</th>
                                    <th>Property</th>
                                    <th>Comparison</th>
                                    <th>Target</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <select class="form-select">
                                            <option value="STATUS_CODE" selected="">Status code
                                            </option>
                                            <option value="JSON_BODY">JSON body</option>
                                            <option value="HEADERS">Headers</option>
                                            <option value="TEXT_BODY">Text body</option>
                                            <option value="RESPONSE_TIME">Response time</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control">
                                    </td>
                                    <td>
                                        <select class="form-select">
                                            <option value="EQUALS" selected="">Equals</option>
                                            <option value="NOT_EQUALS">Not equals</option>
                                            <option value="HAS_KEY">Has key</option>
                                            <option value="NOT_HAS_KEY">Not has key</option>
                                            <option value="HAS_VALUE">Has value</option>
                                            <option value="NOT_HAS_VALUE">Not has value</option>
                                            <option value="IS_EMPTY">Is empty</option>
                                            <option value="NOT_EMPTY">Is not empty</option>
                                            <option value="GREATER_THAN">Greater than</option>
                                            <option value="LESS_THAN">Less than</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" value="200">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <select class="form-select">
                                            <option value="STATUS_CODE">Status code</option>
                                            <option value="JSON_BODY" selected="">JSON body</option>
                                            <option value="HEADERS">Headers</option>
                                            <option value="TEXT_BODY">Text body</option>
                                            <option value="RESPONSE_TIME">Response time</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" value="parameters.alt.type">
                                    </td>
                                    <td>
                                        <select class="form-select">
                                            <option value="EQUALS">Equals</option>
                                            <option value="NOT_EQUALS">Not equals</option>
                                            <option value="HAS_KEY">Has key</option>
                                            <option value="NOT_HAS_KEY">Not has key</option>
                                            <option value="HAS_VALUE" selected="">Has value</option>
                                            <option value="NOT_HAS_VALUE">Not has value</option>
                                            <option value="IS_EMPTY">Is empty</option>
                                            <option value="NOT_EMPTY">Is not empty</option>
                                            <option value="GREATER_THAN">Greater than</option>
                                            <option value="LESS_THAN">Less than</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" value="string">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <select class="form-select">
                                            <option value="STATUS_CODE">Status code</option>
                                            <option value="JSON_BODY">JSON body</option>
                                            <option value="HEADERS">Headers</option>
                                            <option value="TEXT_BODY">Text body</option>
                                            <option value="RESPONSE_TIME" selected="">Response time
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control">
                                    </td>
                                    <td>
                                        <select class="form-select">
                                            <option value="EQUALS">Equals</option>
                                            <option value="NOT_EQUALS">Not equals</option>
                                            <option value="HAS_KEY">Has key</option>
                                            <option value="NOT_HAS_KEY">Not has key</option>
                                            <option value="HAS_VALUE">Has value</option>
                                            <option value="NOT_HAS_VALUE">Not has value</option>
                                            <option value="IS_EMPTY">Is empty</option>
                                            <option value="NOT_EMPTY">Is not empty</option>
                                            <option value="GREATER_THAN">Greater than</option>
                                            <option value="LESS_THAN" selected="">Less than</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" value="500">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <select class="form-select">
                                            <option value="STATUS_CODE">Status code</option>
                                            <option value="JSON_BODY">JSON body</option>
                                            <option value="HEADERS" selected="">Headers</option>
                                            <option value="TEXT_BODY">Text body</option>
                                            <option value="RESPONSE_TIME">Response time</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" value="content-type">
                                    </td>
                                    <td>
                                        <select class="form-select">
                                            <option value="EQUALS" selected="">Equals</option>
                                            <option value="NOT_EQUALS">Not equals</option>
                                            <option value="HAS_KEY">Has key</option>
                                            <option value="NOT_HAS_KEY">Not has key</option>
                                            <option value="HAS_VALUE">Has value</option>
                                            <option value="NOT_HAS_VALUE">Not has value</option>
                                            <option value="IS_EMPTY">Is empty</option>
                                            <option value="NOT_EMPTY">Is not empty</option>
                                            <option value="GREATER_THAN">Greater than</option>
                                            <option value="LESS_THAN">Less than</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" value="application/json; charset=UTF-8">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <button type="submit" class="btn btn-primary">Make request</button>
                </div>
            </div>
        </div>
    </div>
    <?php  /****AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA**********/  ?>
    <?php  /****container-xl**********/  ?>
    <?php  /*****body**********/  ?>
</div>
<!-- BEGIN PAGE LIBRARIES -->
<script src="<?php echo base_url('assets');?>/libs/imask/dist/imask.min.js" defer></script>
<script src="<?php echo base_url('assets');?>/libs/autosize/dist/autosize.min.js" defer></script>
<script src="<?php echo base_url('assets');?>/libs/nouislider/dist/nouislider.min.js" defer></script>
<script src="<?php echo base_url('assets');?>/libs/litepicker/dist/litepicker.js" defer></script>
<script src="<?php echo base_url('assets');?>/libs/tom-select/dist/js/tom-select.base.min.js" defer></script>
<!-- END PAGE LIBRARIES -->

<!-- BEGIN DEMO SCRIPTS -->
<script src="<?php echo base_url('assets');?>/preview/js/demo.js" defer></script>
<!-- END DEMO SCRIPTS -->

<!-- BEGIN PAGE SCRIPTS -->
<script>
document.addEventListener("DOMContentLoaded", function() {
    window.tabler_select = window.tabler_select || {};
    var el;
    window.TomSelect && (window.tabler_select["select-states"] = new TomSelect(el = document
        .getElementById(
            'select-states'), {
            copyClassesToDropdown: false,
            dropdownParent: 'body',
            controlInput: '<input>',
            render: {
                item: function(data, escape) {
                    if (data.customProperties) {
                        return '<div><span class="dropdown-item-indicator">' + data
                            .customProperties + '</span>' + escape(data.text) + '</div>';
                    }
                    return '<div>' + escape(data.text) + '</div>';
                },
                option: function(data, escape) {
                    if (data.customProperties) {
                        return '<div><span class="dropdown-item-indicator">' + data
                            .customProperties + '</span>' + escape(data.text) + '</div>';
                    }
                    return '<div>' + escape(data.text) + '</div>';
                },
            },
        }));
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    window.noUiSlider && (noUiSlider.create(document.getElementById('range-simple'), {
        start: 20,
        connect: [true, false],
        step: 10,
        range: {
            min: 0,
            max: 100
        }
    }));
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    window.noUiSlider && (noUiSlider.create(document.getElementById('range-connect'), {
        start: [60, 90],
        connect: [false, true, false],
        step: 10,
        range: {
            min: 0,
            max: 100
        }
    }));
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    window.noUiSlider && (noUiSlider.create(document.getElementById('range-color'), {
        start: 40,
        connect: [true, false],
        step: 10,
        range: {
            min: 0,
            max: 100
        }
    }));
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    window.tabler_datepicker = window.tabler_datepicker || {};
    window.Litepicker && (window.tabler_datepicker["datepicker-default"] = new Litepicker({
        element: document.getElementById('datepicker-default'),
        buttonText: {
            previousMonth: `<!-- Download SVG icon from http://tabler.io/icons/icon/chevron-left -->
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-1"><path d="M15 6l-6 6l6 6" /></svg>`,
            nextMonth: `<!-- Download SVG icon from http://tabler.io/icons/icon/chevron-right -->
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-1"><path d="M9 6l6 6l-6 6" /></svg>`,
        },
    }));
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    window.tabler_datepicker = window.tabler_datepicker || {};
    window.Litepicker && (window.tabler_datepicker["datepicker-icon"] = new Litepicker({
        element: document.getElementById('datepicker-icon'),
        buttonText: {
            previousMonth: `<!-- Download SVG icon from http://tabler.io/icons/icon/chevron-left -->
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-1"><path d="M15 6l-6 6l6 6" /></svg>`,
            nextMonth: `<!-- Download SVG icon from http://tabler.io/icons/icon/chevron-right -->
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-1"><path d="M9 6l6 6l-6 6" /></svg>`,
        },
    }));
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    window.tabler_datepicker = window.tabler_datepicker || {};
    window.Litepicker && (window.tabler_datepicker["datepicker-icon-prepend"] = new Litepicker({
        element: document.getElementById('datepicker-icon-prepend'),
        buttonText: {
            previousMonth: `<!-- Download SVG icon from http://tabler.io/icons/icon/chevron-left -->
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-1"><path d="M15 6l-6 6l6 6" /></svg>`,
            nextMonth: `<!-- Download SVG icon from http://tabler.io/icons/icon/chevron-right -->
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-1"><path d="M9 6l6 6l-6 6" /></svg>`,
        },
    }));
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    window.tabler_datepicker = window.tabler_datepicker || {};
    window.Litepicker && (window.tabler_datepicker["datepicker-inline"] = new Litepicker({
        element: document.getElementById('datepicker-inline'),
        buttonText: {
            previousMonth: `<!-- Download SVG icon from http://tabler.io/icons/icon/chevron-left -->
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-1"><path d="M15 6l-6 6l6 6" /></svg>`,
            nextMonth: `<!-- Download SVG icon from http://tabler.io/icons/icon/chevron-right -->
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-1"><path d="M9 6l6 6l-6 6" /></svg>`,
        },
        inlineMode: true,
    }));
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    window.tabler_select = window.tabler_select || {};
    var el;
    window.TomSelect && (window.tabler_select["select-tags"] = new TomSelect(el = document.getElementById(
        'select-tags'), {
        copyClassesToDropdown: false,
        dropdownParent: 'body',
        controlInput: '<input>',
        render: {
            item: function(data, escape) {
                if (data.customProperties) {
                    return '<div><span class="dropdown-item-indicator">' + data
                        .customProperties + '</span>' + escape(data.text) + '</div>';
                }
                return '<div>' + escape(data.text) + '</div>';
            },
            option: function(data, escape) {
                if (data.customProperties) {
                    return '<div><span class="dropdown-item-indicator">' + data
                        .customProperties + '</span>' + escape(data.text) + '</div>';
                }
                return '<div>' + escape(data.text) + '</div>';
            },
        },
    }));
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    window.tabler_select = window.tabler_select || {};
    var el;
    window.TomSelect && (window.tabler_select["select-users"] = new TomSelect(el = document.getElementById(
        'select-users'), {
        copyClassesToDropdown: false,
        dropdownParent: 'body',
        controlInput: '<input>',
        render: {
            item: function(data, escape) {
                if (data.customProperties) {
                    return '<div><span class="dropdown-item-indicator">' + data
                        .customProperties + '</span>' + escape(data.text) + '</div>';
                }
                return '<div>' + escape(data.text) + '</div>';
            },
            option: function(data, escape) {
                if (data.customProperties) {
                    return '<div><span class="dropdown-item-indicator">' + data
                        .customProperties + '</span>' + escape(data.text) + '</div>';
                }
                return '<div>' + escape(data.text) + '</div>';
            },
        },
    }));
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    window.tabler_select = window.tabler_select || {};
    var el;
    window.TomSelect && (window.tabler_select["select-optgroups"] = new TomSelect(el = document
        .getElementById(
            'select-optgroups'), {
            copyClassesToDropdown: false,
            dropdownParent: 'body',
            controlInput: '<input>',
            render: {
                item: function(data, escape) {
                    if (data.customProperties) {
                        return '<div><span class="dropdown-item-indicator">' + data
                            .customProperties + '</span>' + escape(data.text) + '</div>';
                    }
                    return '<div>' + escape(data.text) + '</div>';
                },
                option: function(data, escape) {
                    if (data.customProperties) {
                        return '<div><span class="dropdown-item-indicator">' + data
                            .customProperties + '</span>' + escape(data.text) + '</div>';
                    }
                    return '<div>' + escape(data.text) + '</div>';
                },
            },
        }));
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    window.tabler_select = window.tabler_select || {};
    var el;
    window.TomSelect && (window.tabler_select["select-people"] = new TomSelect(el = document
        .getElementById(
            'select-people'), {
            copyClassesToDropdown: false,
            dropdownParent: 'body',
            controlInput: '<input>',
            render: {
                item: function(data, escape) {
                    if (data.customProperties) {
                        return '<div><span class="dropdown-item-indicator">' + data
                            .customProperties + '</span>' + escape(data.text) + '</div>';
                    }
                    return '<div>' + escape(data.text) + '</div>';
                },
                option: function(data, escape) {
                    if (data.customProperties) {
                        return '<div><span class="dropdown-item-indicator">' + data
                            .customProperties + '</span>' + escape(data.text) + '</div>';
                    }
                    return '<div>' + escape(data.text) + '</div>';
                },
            },
        }));
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    window.tabler_select = window.tabler_select || {};
    var el;
    window.TomSelect && (window.tabler_select["select-countries"] = new TomSelect(el = document
        .getElementById(
            'select-countries'), {
            copyClassesToDropdown: false,
            dropdownParent: 'body',
            controlInput: '<input>',
            render: {
                item: function(data, escape) {
                    if (data.customProperties) {
                        return '<div><span class="dropdown-item-indicator">' + data
                            .customProperties + '</span>' + escape(data.text) + '</div>';
                    }
                    return '<div>' + escape(data.text) + '</div>';
                },
                option: function(data, escape) {
                    if (data.customProperties) {
                        return '<div><span class="dropdown-item-indicator">' + data
                            .customProperties + '</span>' + escape(data.text) + '</div>';
                    }
                    return '<div>' + escape(data.text) + '</div>';
                },
            },
        }));
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    window.tabler_select = window.tabler_select || {};
    var el;
    window.TomSelect && (window.tabler_select["select-labels"] = new TomSelect(el = document
        .getElementById(
            'select-labels'), {
            copyClassesToDropdown: false,
            dropdownParent: 'body',
            controlInput: '<input>',
            render: {
                item: function(data, escape) {
                    if (data.customProperties) {
                        return '<div><span class="dropdown-item-indicator">' + data
                            .customProperties + '</span>' + escape(data.text) + '</div>';
                    }
                    return '<div>' + escape(data.text) + '</div>';
                },
                option: function(data, escape) {
                    if (data.customProperties) {
                        return '<div><span class="dropdown-item-indicator">' + data
                            .customProperties + '</span>' + escape(data.text) + '</div>';
                    }
                    return '<div>' + escape(data.text) + '</div>';
                },
            },
        }));
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    window.tabler_select = window.tabler_select || {};
    var el;
    window.TomSelect && (window.tabler_select["select-countries-valid"] = new TomSelect(el = document
        .getElementById('select-countries-valid'), {
            copyClassesToDropdown: false,
            dropdownParent: 'body',
            controlInput: '<input>',
            render: {
                item: function(data, escape) {
                    if (data.customProperties) {
                        return '<div><span class="dropdown-item-indicator">' + data
                            .customProperties + '</span>' + escape(data.text) + '</div>';
                    }
                    return '<div>' + escape(data.text) + '</div>';
                },
                option: function(data, escape) {
                    if (data.customProperties) {
                        return '<div><span class="dropdown-item-indicator">' + data
                            .customProperties + '</span>' + escape(data.text) + '</div>';
                    }
                    return '<div>' + escape(data.text) + '</div>';
                },
            },
        }));
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    window.tabler_select = window.tabler_select || {};
    var el;
    window.TomSelect && (window.tabler_select["select-countries-invalid"] = new TomSelect(el = document
        .getElementById('select-countries-invalid'), {
            copyClassesToDropdown: false,
            dropdownParent: 'body',
            controlInput: '<input>',
            render: {
                item: function(data, escape) {
                    if (data.customProperties) {
                        return '<div><span class="dropdown-item-indicator">' + data
                            .customProperties + '</span>' + escape(data.text) + '</div>';
                    }
                    return '<div>' + escape(data.text) + '</div>';
                },
                option: function(data, escape) {
                    if (data.customProperties) {
                        return '<div><span class="dropdown-item-indicator">' + data
                            .customProperties + '</span>' + escape(data.text) + '</div>';
                    }
                    return '<div>' + escape(data.text) + '</div>';
                },
            },
        }));
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    var themeConfig = {
        theme: "light",
        "theme-base": "gray",
        "theme-font": "sans-serif",
        "theme-primary": "blue",
        "theme-radius": "1",
    }
    var url = new URL(window.location)
    var form = document.getElementById("offcanvasSettings")
    var resetButton = document.getElementById("reset-changes")
    var checkItems = function() {
        for (var key in themeConfig) {
            var value = window.localStorage["tabler-" + key] || themeConfig[key]
            if (!!value) {
                var radios = form.querySelectorAll(`[name="${key}"]`)
                if (!!radios) {
                    radios.forEach((radio) => {
                        radio.checked = radio.value === value
                    })
                }
            }
        }
    }
    form.addEventListener("change", function(event) {
        var target = event.target,
            name = target.name,
            value = target.value
        for (var key in themeConfig) {
            if (name === key) {
                document.documentElement.setAttribute("data-bs-" + key, value)
                window.localStorage.setItem("tabler-" + key, value)
                url.searchParams.set(key, value)
            }
        }
        window.history.pushState({}, "", url)
    })
    resetButton.addEventListener("click", function() {
        for (var key in themeConfig) {
            var value = themeConfig[key]
            document.documentElement.removeAttribute("data-bs-" + key)
            window.localStorage.removeItem("tabler-" + key)
            url.searchParams.delete(key)
        }
        checkItems()
        window.history.pushState({}, "", url)
    })
    checkItems()
})
</script>
<!-- END PAGE SCRIPTS -->