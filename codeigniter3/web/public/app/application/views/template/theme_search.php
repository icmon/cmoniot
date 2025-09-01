<?php 
#####################
$language = $this->lang->language;
$lang=$this->lang->line('lang');
$menu_search=$this->lang->line('menu_search');
$segment1=$this->uri->segment(1);
$segment2=$this->uri->segment(2);
$segment3=$this->uri->segment(3);
$segment4=$this->uri->segment(4);
$segment5=$this->uri->segment(5);
$segment6=$this->uri->segment(6);
$segment7=$this->uri->segment(7);
$segment8=$this->uri->segment(8);
$segment9=$this->uri->segment(9);
$segment10=$this->uri->segment(10);
$urlsearch=$this->uri->segment(1);
if($segment2){
    $urlsearch=$segment1.'/'.$segment2;
}else if($segment3){
    $urlsearch=$segment1.'/'.$segment2.'/'.$segment3;
}else if($segment4){
    $urlsearch=$segment1.'/'.$segment2.'/'.$segment3.'/'.$segment4;
}else if($segment5){
    $urlsearch=$segment1.'/'.$segment2.'/'.$segment3.'/'.$segment4.'/'.$segment5;
}else if($segment6){
    $urlsearch=$segment1.'/'.$segment2.'/'.$segment3.'/'.$segment4.'/'.$segment5.'/'.$segment6;
}
$input=@$this->input->post(); 
if($input==null){ $input=@$this->input->get();}
$input_search=@$input['keyword'];
// echo '<pre> lang=>'; print_r($lang); echo '</pre>';  

// echo '<pre> urlsearch=>'; print_r($urlsearch); echo '</pre>';  
// echo '<pre> input_search=>'; print_r($input_search); echo '</pre>';  
// echo '<pre> _SESSION=>'; print_r($_SESSION); echo '</pre>';  
// echo '<pre> _COOKIE=>'; print_r($_COOKIE); echo '</pre>';  

?>
<div class="col-2 d-none d-xxl-block">
    <div class="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
        <form method="post" class="form-search" action="<?php echo base_url($urlsearch);?>" autocomplete="on">
            <div class="input-icon">
                <span class="input-icon-addon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-1">
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>
                </span>
                <input type="text" name="keyword" value="<?php echo $input_search;?>" class="form-control"
                    placeholder="<?php echo $menu_search;?>…" aria-label="Search in website">
                <input type="submit" style="display: none;" />
            </div>
        </form>
    </div>
</div>
<?php #####################?>