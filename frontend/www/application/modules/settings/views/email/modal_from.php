<!-- BEGIN PAGE MODALS -->
<div class="modal modal-blur fade" id="modal-report" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add New email</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form class="card card-md" action="<?php echo base_url('settings/email/insertdb');?>" method="post"
                autocomplete="off" novalidate id="userupdateForm" onsubmit="return validateForm()">
                <div class="modal-body">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" name="example-text-input"
                                placeholder="Your report name" id="title" name="title">
                        </div>

                        <label class="form-label">Report type</label>
                        <div class="form-selectgroup-boxes row mb-3">

                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="mb-3">
                                        <label class="form-label">Report url</label>
                                        <div class="input-group input-group-flat">

                                            <span class="input-group-text">

                                                https://tabler.io/reports/

                                            </span>

                                            <input type="text" class="form-control ps-0" value="report-01"
                                                autocomplete="off" id="option2" name="option2">

                                        </div>

                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label class="form-label">Visibility</label>

                                        <select class="form-select" id="type_id" name="type_id">

                                            <option value="1" selected>Private</option>

                                            <option value="2">Public</option>

                                            <option value="3">Hidden</option>

                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="modal-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label class="form-label">Client name</label>
                                        <input type="text" class="form-control" id="name" name="name">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label class="form-label">Reporting period</label>
                                        <input type="date" class="form-control">
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div>
                                        <label class="form-label">Additional information</label>
                                        <textarea class="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <div class="card-footer bg-transparent mt-auto">
                                <div class="btn-list justify-content-end">
                                    <button type="reset" value="Reset" class="btn btn-1">
                                        <?php echo $this->lang->line('button_cancel');?></button>
                                    <button type="submit" id="submitBtn" value="Submit" class="btn btn-primary btn-2">
                                        <?php echo $this->lang->line('button_submit');?></button>
                                </div>
                            </div>

                        </div>
                    </div>
            </form>
        </div>
    </div>
</div>
</div>
<!-- END PAGE MODALS -->