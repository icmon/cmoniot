<?php 
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
$option=$input['option'];
$api_url= $this->config->item('api_url');
?>

<!-- BEGIN PAGE BODY -->
<div class="page-body">

    <div class="container-xl">

        <div class="row row-cards row-cols-1 row-cols-md-2">
            <div class="col">
                <div class="row row-cards">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">
                                    Basic Form
                                </h3>
                            </div>
                            <div class="card-body">
                                <form class="space-y">
                                    <div class="row">
                                        <div class="col-6">
                                            <input type="text" placeholder="Name" class="form-control" />
                                        </div>

                                        <div class="col-6">
                                            <input type="email" placeholder="Email address" class="form-control" />
                                        </div>
                                    </div>

                                    <div>
                                        <input type="password" placeholder="Password" class="form-control" />
                                    </div>

                                    <div>
                                        <input type="password" placeholder="Confirm Password" class="form-control" />
                                    </div>

                                    <div>

                                        <a href="#" class="btn btn-primary btn-3 w-100">

                                            Submit

                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">
                                    Example Form
                                </h3>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="space-y">
                                        <div>
                                            <label class="form-label">
                                                First Name
                                            </label>
                                            <input type="text" placeholder="Enter first name" class="form-control">
                                        </div>

                                        <div>
                                            <label class="form-label">
                                                Last Name
                                            </label>
                                            <input type="text" placeholder="Enter last name" class="form-control">
                                        </div>

                                        <div>
                                            <label class="form-label">
                                                Email
                                            </label>
                                            <input type="email" placeholder="Enter email address" class="form-control">
                                        </div>

                                        <div>
                                            <label class="form-label">
                                                Select Subject
                                            </label>
                                            <select class="form-select">
                                                <option>
                                                    Option 1
                                                </option>
                                                <option>
                                                    Option 2
                                                </option>
                                                <option>
                                                    Option 3
                                                </option>
                                                <option>
                                                    Option 4
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label class="form-label">
                                                Message
                                            </label>
                                            <textarea placeholder="Enter your message" rows="6"
                                                class="form-control"></textarea>
                                        </div>

                                        <div>

                                            <a href="#" class="btn btn-primary btn-4 w-100">

                                                Send Message
                                                <!-- Download SVG icon from http://tabler.io/icons/icon/arrow-right -->
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-right icon-2">
                                                    <path d="M5 12l14 0" />
                                                    <path d="M13 18l6 -6" />
                                                    <path d="M13 6l6 6" />
                                                </svg>

                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="col">
                <div class="row row-cards">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">
                                    Example Form with Icons
                                </h3>
                            </div>
                            <div class="card-body">
                                <form class="space-y">
                                    <div>

                                        <div class="input-icon">

                                            <span class="input-icon-addon">
                                                <!-- Download SVG icon from http://tabler.io/icons/icon/user -->
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-1">
                                                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                </svg>
                                            </span>

                                            <input type="text" value="" class="form-control" placeholder="Username">

                                        </div>

                                    </div>

                                    <div>

                                        <div class="input-icon">

                                            <span class="input-icon-addon">
                                                <!-- Download SVG icon from http://tabler.io/icons/icon/mail -->
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-1">
                                                    <path
                                                        d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                                                    <path d="M3 7l9 6l9 -6" />
                                                </svg>
                                            </span>

                                            <input type="mail" value="" class="form-control"
                                                placeholder="Email address">

                                        </div>

                                    </div>

                                    <div>

                                        <div class="input-icon">

                                            <span class="input-icon-addon">
                                                <!-- Download SVG icon from http://tabler.io/icons/icon/lock -->
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-1">
                                                    <path
                                                        d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                                                    <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                                                    <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                                                </svg>
                                            </span>

                                            <input type="password" value="" class="form-control" placeholder="Password">

                                        </div>

                                    </div>

                                    <div>

                                        <div class="input-icon">

                                            <span class="input-icon-addon">
                                                <!-- Download SVG icon from http://tabler.io/icons/icon/lock -->
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-1">
                                                    <path
                                                        d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                                                    <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                                                    <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                                                </svg>
                                            </span>

                                            <input type="password" value="" class="form-control"
                                                placeholder="Confirm Password">

                                        </div>

                                    </div>

                                    <div>
                                        <div class="row align-items-center">
                                            <div class="col">

                                                <label class="form-check m-0">
                                                    <input class="form-check-input" type="checkbox">

                                                    <span class="form-check-label">Remember me</span>

                                                </label>

                                            </div>
                                            <div class="col-auto">

                                                <a href="#" class="btn btn-primary btn-3">

                                                    Create Account
                                                    <!-- Download SVG icon from http://tabler.io/icons/icon/arrow-right -->
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="icon icon-right icon-2">
                                                        <path d="M5 12l14 0" />
                                                        <path d="M13 18l6 -6" />
                                                        <path d="M13 6l6 6" />
                                                    </svg>

                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">

                        <form class="card">
                            <div class="card-header">
                                <h3 class="card-title">Horizontal form</h3>
                            </div>
                            <div class="card-body">
                                <div class="mb-3 row">
                                    <label class="col-3 col-form-label required">Email address</label>
                                    <div class="col">
                                        <input type="email" class="form-control" aria-describedby="emailHelp"
                                            placeholder="Enter email">
                                        <small class="form-hint">We'll never share your email with anyone else.</small>
                                    </div>
                                </div>

                                <div class="mb-3 row">
                                    <label class="col-3 col-form-label required">Password</label>
                                    <div class="col">
                                        <input type="password" class="form-control" placeholder="Password">
                                        <small class="form-hint">
                                            Your password must be 8-20 characters long, contain letters and numbers, and
                                            must not contain
                                            spaces, special characters, or emoji.
                                        </small>
                                    </div>
                                </div>

                                <div class="mb-3 row">
                                    <label class="col-3 col-form-label">Select</label>
                                    <div class="col">
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

                                <div class="row">
                                    <label class="col-3 col-form-label pt-0">Checkboxes</label>
                                    <div class="col">
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

                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">
                                    Example Form
                                </h3>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="space-y">
                                        <div>
                                            <h4>
                                                Personal Info
                                            </h4>
                                        </div>

                                        <div class="row row-cols-2 g-4">
                                            <div>
                                                <label class="form-label">
                                                    First Name
                                                </label>
                                                <input type="text" placeholder="Enter first name" class="form-control">
                                            </div>

                                            <div>
                                                <label class="form-label">
                                                    Last Name
                                                </label>
                                                <input type="text" placeholder="Enter last name" class="form-control">
                                            </div>

                                            <div>
                                                <label class="form-label">
                                                    Gender
                                                </label>
                                                <div>
                                                    <select class="form-select">
                                                        <option>
                                                            Male
                                                        </option>
                                                        <option>
                                                            Female
                                                        </option>
                                                        <option>
                                                            Others
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label class="form-label">
                                                    Date of Birth
                                                </label>

                                                <div>

                                                    <div class="input-icon">

                                                        <input class="form-control" placeholder="Select a date"
                                                            id="datepicker-birth-date" value="2020-06-20" />
                                                        <span class="input-icon-addon">
                                                            <!-- Download SVG icon from http://tabler.io/icons/icon/calendar -->
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"
                                                                class="icon icon-1">
                                                                <path
                                                                    d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                                                                <path d="M16 3v4" />
                                                                <path d="M8 3v4" />
                                                                <path d="M4 11h16" />
                                                                <path d="M11 15h1" />
                                                                <path d="M12 15v3" />
                                                            </svg>
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label class="form-label">
                                                Category
                                            </label>
                                            <div>
                                                <select class="form-select">
                                                    <option>
                                                        Category 1
                                                    </option>
                                                    <option>
                                                        Category 2
                                                    </option>
                                                    <option>
                                                        Category 3
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <h4>
                                                Address
                                            </h4>
                                        </div>

                                        <div>
                                            <label class="form-label">
                                                Street
                                            </label>
                                            <input type="text" class="form-control">
                                        </div>

                                        <div class="row row-cols-2 g-4">
                                            <div>
                                                <label class="form-label">
                                                    City
                                                </label>
                                                <input type="text" class="form-control">
                                            </div>

                                            <div>
                                                <label class="form-label">
                                                    State
                                                </label>
                                                <input type="text" class="form-control">
                                            </div>

                                            <div>
                                                <label class="form-label">
                                                    Post Code
                                                </label>
                                                <input type="text" class="form-control">
                                            </div>

                                            <div>
                                                <label class="form-label">
                                                    Country
                                                </label>
                                                <div>
                                                    <select class="form-select">
                                                        <option>
                                                            --Select Country--
                                                        </option>

                                                        <option>
                                                            Andorra
                                                        </option>

                                                        <option>
                                                            United Arab Emirates
                                                        </option>

                                                        <option>
                                                            Afghanistan
                                                        </option>

                                                        <option>
                                                            Antigua
                                                        </option>

                                                        <option>
                                                            Anguilla
                                                        </option>

                                                        <option>
                                                            Armenia
                                                        </option>

                                                        <option>
                                                            Angolan
                                                        </option>

                                                        <option>
                                                            Antarctica
                                                        </option>

                                                        <option>
                                                            Argentina
                                                        </option>

                                                        <option>
                                                            American Samoa
                                                        </option>

                                                        <option>
                                                            Austria
                                                        </option>

                                                        <option>
                                                            Australia
                                                        </option>

                                                        <option>
                                                            Aruba
                                                        </option>

                                                        <option>
                                                            Aslan Islands
                                                        </option>

                                                        <option>
                                                            Azerbaijan
                                                        </option>

                                                        <option>
                                                            Bosnian
                                                        </option>

                                                        <option>
                                                            Barbados
                                                        </option>

                                                        <option>
                                                            Belgium
                                                        </option>

                                                        <option>
                                                            Burkina Faso
                                                        </option>

                                                        <option>
                                                            Bulgaria
                                                        </option>

                                                        <option>
                                                            Bahrain
                                                        </option>

                                                        <option>
                                                            Burundi
                                                        </option>

                                                        <option>
                                                            Benin
                                                        </option>

                                                        <option>
                                                            Saint-Barthélemy
                                                        </option>

                                                        <option>
                                                            Bermuda
                                                        </option>

                                                        <option>
                                                            Bruneian
                                                        </option>

                                                        <option>
                                                            Bolivia
                                                        </option>

                                                        <option>
                                                            Bonaire
                                                        </option>

                                                        <option>
                                                            Brazil
                                                        </option>

                                                        <option>
                                                            Bahamas
                                                        </option>

                                                        <option>
                                                            Bhutan
                                                        </option>

                                                        <option>
                                                            Bouvet Island
                                                        </option>

                                                        <option>
                                                            Batswana
                                                        </option>

                                                        <option>
                                                            Belarus
                                                        </option>

                                                        <option>
                                                            Belize
                                                        </option>

                                                        <option>
                                                            Canada
                                                        </option>

                                                        <option>
                                                            Cocos Island
                                                        </option>

                                                        <option>
                                                            Democratic Republic of Congo
                                                        </option>

                                                        <option>
                                                            Central African Republic
                                                        </option>

                                                        <option>
                                                            Republic of the Congo
                                                        </option>

                                                        <option>
                                                            Switzerland
                                                        </option>

                                                        <option>
                                                            Ivory Coast
                                                        </option>

                                                        <option>
                                                            Cook Island
                                                        </option>

                                                        <option>
                                                            Chile
                                                        </option>

                                                        <option>
                                                            Cameroon
                                                        </option>

                                                        <option>
                                                            China
                                                        </option>

                                                        <option>
                                                            Colombia
                                                        </option>

                                                        <option>
                                                            Costa Rica
                                                        </option>

                                                        <option>
                                                            Cuba
                                                        </option>

                                                        <option>
                                                            Cape Verde
                                                        </option>

                                                        <option>
                                                            Curacao
                                                        </option>

                                                        <option>
                                                            Christmas Island
                                                        </option>

                                                        <option>
                                                            Cyprus
                                                        </option>

                                                        <option>
                                                            Czech Republic
                                                        </option>

                                                        <option>
                                                            Germany
                                                        </option>

                                                        <option>
                                                            Djibouti
                                                        </option>

                                                        <option>
                                                            Denmark
                                                        </option>

                                                        <option>
                                                            Dominica
                                                        </option>

                                                        <option>
                                                            Dominican Republic
                                                        </option>

                                                        <option>
                                                            Algeria
                                                        </option>

                                                        <option>
                                                            Ecuador
                                                        </option>

                                                        <option>
                                                            Estonia
                                                        </option>

                                                        <option>
                                                            Egypt
                                                        </option>

                                                        <option>
                                                            Sahrawi
                                                        </option>

                                                        <option>
                                                            Eritrea
                                                        </option>

                                                        <option>
                                                            Spain
                                                        </option>

                                                        <option>
                                                            Ethiopia
                                                        </option>

                                                        <option>
                                                            European Union
                                                        </option>

                                                        <option>
                                                            Finland
                                                        </option>

                                                        <option>
                                                            Fiji
                                                        </option>

                                                        <option>
                                                            Falkland Islands
                                                        </option>

                                                        <option>
                                                            Federate States of Micronesia
                                                        </option>

                                                        <option>
                                                            Faroe Islands
                                                        </option>

                                                        <option>
                                                            France
                                                        </option>

                                                        <option>
                                                            Gabon
                                                        </option>

                                                        <option>
                                                            Great Britain
                                                        </option>

                                                        <option>
                                                            England
                                                        </option>

                                                        <option>
                                                            Nothern Ireland
                                                        </option>

                                                        <option>
                                                            Scotland
                                                        </option>

                                                        <option>
                                                            Wales
                                                        </option>

                                                        <option>
                                                            Grenada
                                                        </option>

                                                        <option>
                                                            Georgia
                                                        </option>

                                                        <option>
                                                            Guyana
                                                        </option>

                                                        <option>
                                                            Guernsey
                                                        </option>

                                                        <option>
                                                            Ghana
                                                        </option>

                                                        <option>
                                                            Gibraltar
                                                        </option>

                                                        <option>
                                                            Greenland
                                                        </option>

                                                        <option>
                                                            Gambia
                                                        </option>

                                                        <option>
                                                            Guinea
                                                        </option>

                                                        <option>
                                                            Guadeloupe
                                                        </option>

                                                        <option>
                                                            Equatorial Guinea
                                                        </option>

                                                        <option>
                                                            Greece
                                                        </option>

                                                        <option>
                                                            South Georgia
                                                        </option>

                                                        <option>
                                                            Guatemala
                                                        </option>

                                                        <option>
                                                            Guam
                                                        </option>

                                                        <option>
                                                            Guinea-Bissau
                                                        </option>

                                                        <option>
                                                            Guyana
                                                        </option>

                                                        <option>
                                                            Hong Kong
                                                        </option>

                                                        <option>
                                                            Heard and McDonald Islands
                                                        </option>

                                                        <option>
                                                            Honduras
                                                        </option>

                                                        <option>
                                                            Croatia
                                                        </option>

                                                        <option>
                                                            Haiti
                                                        </option>

                                                        <option>
                                                            Hungary
                                                        </option>

                                                        <option>
                                                            Indonesia
                                                        </option>

                                                        <option>
                                                            Ireland
                                                        </option>

                                                        <option>
                                                            Israel
                                                        </option>

                                                        <option>
                                                            Isle of Man
                                                        </option>

                                                        <option>
                                                            India
                                                        </option>

                                                        <option>
                                                            British Indian Ocean Territory
                                                        </option>

                                                        <option>
                                                            Iraq
                                                        </option>

                                                        <option>
                                                            Iran
                                                        </option>

                                                        <option>
                                                            Iceland
                                                        </option>

                                                        <option>
                                                            Italy
                                                        </option>

                                                        <option>
                                                            Jersey
                                                        </option>

                                                        <option>
                                                            Jamaica
                                                        </option>

                                                        <option>
                                                            Jordan
                                                        </option>

                                                        <option>
                                                            Japan
                                                        </option>

                                                        <option>
                                                            Kenya
                                                        </option>

                                                        <option>
                                                            Kyrgyzstan
                                                        </option>

                                                        <option>
                                                            Cambodia
                                                        </option>

                                                        <option>
                                                            Kiribati
                                                        </option>

                                                        <option>
                                                            Comoros
                                                        </option>

                                                        <option>
                                                            Saint Kitts and Nevis
                                                        </option>

                                                        <option>
                                                            North Korea
                                                        </option>

                                                        <option>
                                                            South Korea
                                                        </option>

                                                        <option>
                                                            Kuwait
                                                        </option>

                                                        <option>
                                                            Cayman Islands
                                                        </option>

                                                        <option>
                                                            Kazakhstan
                                                        </option>

                                                        <option>
                                                            Laos
                                                        </option>

                                                        <option>
                                                            Lebanese
                                                        </option>

                                                        <option>
                                                            Saint Lucia
                                                        </option>

                                                        <option>
                                                            Liechtenstein
                                                        </option>

                                                        <option>
                                                            Sri Lanka
                                                        </option>

                                                        <option>
                                                            Liberia
                                                        </option>

                                                        <option>
                                                            Lesotho
                                                        </option>

                                                        <option>
                                                            Lithuania
                                                        </option>

                                                        <option>
                                                            Luxembourg
                                                        </option>

                                                        <option>
                                                            Latvia
                                                        </option>

                                                        <option>
                                                            Libya
                                                        </option>

                                                        <option>
                                                            Morocco
                                                        </option>

                                                        <option>
                                                            Monaco
                                                        </option>

                                                        <option>
                                                            Moldova
                                                        </option>

                                                        <option>
                                                            Montenegro
                                                        </option>

                                                        <option>
                                                            Saint Martin
                                                        </option>

                                                        <option>
                                                            Madagascar
                                                        </option>

                                                        <option>
                                                            Marshall Islands
                                                        </option>

                                                        <option>
                                                            Macedonia
                                                        </option>

                                                        <option>
                                                            Mali
                                                        </option>

                                                        <option>
                                                            Myanmar
                                                        </option>

                                                        <option>
                                                            Mongolia
                                                        </option>

                                                        <option>
                                                            Macao
                                                        </option>

                                                        <option>
                                                            Nothern Mariana Islands
                                                        </option>

                                                        <option>
                                                            Martinique
                                                        </option>

                                                        <option>
                                                            Mauritania
                                                        </option>

                                                        <option>
                                                            Montserrat
                                                        </option>

                                                        <option>
                                                            Malta
                                                        </option>

                                                        <option>
                                                            Mauritius
                                                        </option>

                                                        <option>
                                                            Maldives
                                                        </option>

                                                        <option>
                                                            Malawi
                                                        </option>

                                                        <option>
                                                            Mexico
                                                        </option>

                                                        <option>
                                                            Malaysia
                                                        </option>

                                                        <option>
                                                            Mozambique
                                                        </option>

                                                        <option>
                                                            Namibia
                                                        </option>

                                                        <option>
                                                            New Caledonia
                                                        </option>

                                                        <option>
                                                            Niger
                                                        </option>

                                                        <option>
                                                            Norfolk Island
                                                        </option>

                                                        <option>
                                                            Nigeria
                                                        </option>

                                                        <option>
                                                            Nicaragua
                                                        </option>

                                                        <option>
                                                            Norway
                                                        </option>

                                                        <option>
                                                            Nepal
                                                        </option>

                                                        <option>
                                                            Nauruan
                                                        </option>

                                                        <option>
                                                            Niger
                                                        </option>

                                                        <option>
                                                            New Zealand
                                                        </option>

                                                        <option>
                                                            Oman
                                                        </option>

                                                        <option>
                                                            Panama
                                                        </option>

                                                        <option>
                                                            Peru
                                                        </option>

                                                        <option>
                                                            French Polynesia
                                                        </option>

                                                        <option>
                                                            Papua New Guinea
                                                        </option>

                                                        <option>
                                                            Philippines
                                                        </option>

                                                        <option>
                                                            Pakistan
                                                        </option>

                                                        <option>
                                                            Poland
                                                        </option>

                                                        <option>
                                                            Saint Pierre
                                                        </option>

                                                        <option>
                                                            Pitcairn Islands
                                                        </option>

                                                        <option>
                                                            Puerto Rico
                                                        </option>

                                                        <option>
                                                            Palestine
                                                        </option>

                                                        <option>
                                                            Portugal
                                                        </option>

                                                        <option>
                                                            Palau
                                                        </option>

                                                        <option>
                                                            Paraguay
                                                        </option>

                                                        <option>
                                                            Qatar
                                                        </option>

                                                        <option>
                                                            Reunion Island
                                                        </option>

                                                        <option>
                                                            Romania
                                                        </option>

                                                        <option>
                                                            Serbia
                                                        </option>

                                                        <option>
                                                            Russia
                                                        </option>

                                                        <option>
                                                            Rwanda
                                                        </option>

                                                        <option>
                                                            Saudi Arabia
                                                        </option>

                                                        <option>
                                                            Solomon Islands
                                                        </option>

                                                        <option>
                                                            Seychelles
                                                        </option>

                                                        <option>
                                                            Sudan
                                                        </option>

                                                        <option>
                                                            Sweden
                                                        </option>

                                                        <option>
                                                            Singapore
                                                        </option>

                                                        <option>
                                                            Saint Helena
                                                        </option>

                                                        <option>
                                                            Slovenia
                                                        </option>

                                                        <option>
                                                            Svalbard Island
                                                        </option>

                                                        <option>
                                                            Slovakia
                                                        </option>

                                                        <option>
                                                            Sierra Leone
                                                        </option>

                                                        <option>
                                                            San Marino
                                                        </option>

                                                        <option>
                                                            Senegal
                                                        </option>

                                                        <option>
                                                            Somalia
                                                        </option>

                                                        <option>
                                                            Suriname
                                                        </option>

                                                        <option>
                                                            South Sudan
                                                        </option>

                                                        <option>
                                                            Sao Tome
                                                        </option>

                                                        <option>
                                                            El Salvador
                                                        </option>

                                                        <option>
                                                            Sint Maarten
                                                        </option>

                                                        <option>
                                                            Syria
                                                        </option>

                                                        <option>
                                                            Swaziland
                                                        </option>

                                                        <option>
                                                            Turks and Caicos
                                                        </option>

                                                        <option>
                                                            Chad
                                                        </option>

                                                        <option>
                                                            French Southern and Antarctic Lands
                                                        </option>

                                                        <option>
                                                            Togo
                                                        </option>

                                                        <option>
                                                            Thailand
                                                        </option>

                                                        <option>
                                                            Tajikistan
                                                        </option>

                                                        <option>
                                                            Tokelau
                                                        </option>

                                                        <option>
                                                            Timor Leste
                                                        </option>

                                                        <option>
                                                            Turkmenistan
                                                        </option>

                                                        <option>
                                                            Tunisia
                                                        </option>

                                                        <option>
                                                            Tonga
                                                        </option>

                                                        <option>
                                                            Turkey
                                                        </option>

                                                        <option>
                                                            Trinidad and Tobago
                                                        </option>

                                                        <option>
                                                            Tuvalu
                                                        </option>

                                                        <option>
                                                            Taiwan
                                                        </option>

                                                        <option>
                                                            Tanzania
                                                        </option>

                                                        <option>
                                                            Ukraine
                                                        </option>

                                                        <option>
                                                            Uganda
                                                        </option>

                                                        <option>
                                                            United States Minor Islands
                                                        </option>

                                                        <option>
                                                            United States of America
                                                        </option>

                                                        <option>
                                                            Uruguay
                                                        </option>

                                                        <option>
                                                            Uzbekistan
                                                        </option>

                                                        <option>
                                                            Vatican City
                                                        </option>

                                                        <option>
                                                            Saint Vincent
                                                        </option>

                                                        <option>
                                                            Venezuela
                                                        </option>

                                                        <option>
                                                            British Virgin Islands
                                                        </option>

                                                        <option>
                                                            Virgiin Islands
                                                        </option>

                                                        <option>
                                                            Vietnam
                                                        </option>

                                                        <option>
                                                            Vanuatu
                                                        </option>

                                                        <option>
                                                            Wallis and Futuna
                                                        </option>

                                                        <option>
                                                            Samoa
                                                        </option>

                                                        <option>
                                                            Yemen
                                                        </option>

                                                        <option>
                                                            South Africa
                                                        </option>

                                                        <option>
                                                            Zambia
                                                        </option>

                                                        <option>
                                                            Zimbabwe
                                                        </option>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                <label class="form-label">
                                                    Membership
                                                </label>

                                                <div class="d-flex flex-row gap-4">

                                                    <label class="form-check">
                                                        <input class="form-check-input" type="radio" name="membership"
                                                            checked>

                                                        <span class="form-check-label">Free</span>

                                                    </label>

                                                    <label class="form-check">
                                                        <input class="form-check-input" type="radio" name="membership">

                                                        <span class="form-check-label">Paid</span>

                                                    </label>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="text-end">

                                            <a href="#" class="btn btn-1">

                                                Cancel

                                            </a>

                                            <a href="#" class="btn btn-primary btn-2">

                                                Save Changes

                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>
<!-- END PAGE BODY -->