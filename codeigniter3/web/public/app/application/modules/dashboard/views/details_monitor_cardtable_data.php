<?php 
$input=@$this->input->post(); 
if($input==null){$input=@$this->input->get();}
$sensor_name_set1=@$input['bucket'];
if($sensor_name_set1==''){
   $sensor_name_set1="BAACTW02";
}
?>
<div class="card-table table-responsive">
    <table class="table table-vcenter" id="sensorTable">
        <thead>
            <tr>
                <th>NO</th>
                <th>Location</th>
                <th>Name</th>
                <th>Data</th>
                <th>Date Time</th>
            </tr>
        </thead>
        <tbody>
            <!-- Data will be inserted here -->
        </tbody>
    </table>
</div>
<script>
async function fetchTableSensorData() {
    const response = await fetch(
        '<?php echo base_url($this->config->item('api_iot_getsenserlistdata_monitor')).$sensor_name_set1;?>');
    const data = await response.json();
    // console.log("data=>");
    // console.info(data);
    const tableBody = document.querySelector('#sensorTable tbody');
    tableBody.innerHTML = '';

    if (data && data.chart) {
        data.chart.data.forEach((item, idx) => {
            const row = `<tr>
                                <td>${idx + 1}</td>
                                <td>${item.bucket}</td>
                                <td>${item.measurement}</td>
                                <td>${item.value} °C </td>
                                <td>${item.time}</td>
                            </tr>`;
            tableBody.innerHTML += row;
        });
    }
}
// ดึงข้อมูลครั้งแรก
fetchTableSensorData();
// ดึงข้อมูลทุก 10 วินาที
// console.log('setInterval=>' + <?php echo $this->config->item('api_call_time');?>);
setInterval(fetchTableSensorData, <?php echo $this->config->item('api_call_time');?>);
</script>