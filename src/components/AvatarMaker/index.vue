<template>
  <div id='avatar'>
    <HairBack />
    <SkinColor />
    <Tattoos />
    <Accesories />
    <Eyes />
    <EyeBrows />
    <Mouths />
    <Clothes />
    <HairFront />
    <FacialHair />
    <Glasses />

    <!-- FOOTER -->
    <div id='footer'>
      <div id='menu' class=''>
        <div id='random'
          style='position:absolute;bottom:50px;left:0;width:60px;height:50px;cursor:pointer;background-image:url(https://i.imgur.com/IPZeZHl.png);'>
        </div>
        <div id='menu_lines' style='position:absolute;bottom:0;left:0;width:60px;height:50px;cursor:pointer;'>
          <div id='menu1' style='bottom:10px;'></div>
          <div id='menu2' style='bottom:22px;'></div>
          <div id='menu3' style='bottom:34px;'></div>
        </div>
        <div id='menu_list'>
          <button id='skincolor' class='btn'>SKIN COLOR</button>
          <br>
          <button id='eyes' class='btn'>EYES</button>
          <button id='eyebrows' class='btn'>EYEBROWS</button>
          <br>
          <button id='mouths' class='btn'>MOUTH</button>
          <br>
          <button id='hairstyles' class='btn'>HAIR STYLES</button>
          <button id='haircolors' class='btn'>HAIR COLOR</button>
          <button id='facialhairs' class='btn'>FACIAL HAIR</button>
          <br>
          <button id='clothes' class='btn'>CLOTHES</button>
          <button id='fabriccolors' class='btn'>FABRIC COLOR</button>
          <br>
          <button id='glasses' class='btn'>GLASSES</button>
          <button id='glassopacity' class='btn'>GLASS OPACITY</button>
          <br>
          <button id='accesories' class='btn'>ACCESORIES</button>
          <button id='tattoos' class='btn'>TATTOOS</button>
          <br>
          <button id='backgroundcolors' class='btn'>BACKGROUND COLOR</button>
          <hr>
          <button id='download' class='btn'>DOWNLOAD AVATAR</button>
        </div>
      </div>
      <div id="options">
        <div id="options_title">SELECT SKIN COLOR</div>
        <div id="options_div">
          <div
            v-for="(color, i) in colors"
            :key="`color-${i}`"
            class="skins"
            :id="`s_${color}`"
            :style="`background-color: #${color};`"
          />
        </div>
      </div>
    </div>

    <div class="avatar-maker_colors">
      <div
        v-for="(color, i) in colors"
        :key="`color-${i}`"
        class="avatar-maker_colors-item"
        :id="`s_${color}`"
        :style="`background-color: #${color};`"
        @click="selectColor(color)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HairBack from '@/components/AvatarMaker/HairBack.vue';
import Tattoos from '@/components/AvatarMaker/Tattoos.vue';
import Accesories from '@/components/AvatarMaker/Accesories.vue';
import Eyes from '@/components/AvatarMaker/Eyes.vue';
import EyeBrows from '@/components/AvatarMaker/EyeBrows.vue';
import Mouths from '@/components/AvatarMaker/Mouths.vue';
import Clothes from '@/components/AvatarMaker/Clothes.vue';
import HairFront from '@/components/AvatarMaker/HairFront.vue';
import FacialHair from '@/components/AvatarMaker/FacialHair.vue';
import Glasses from '@/components/AvatarMaker/Glasses.vue';
import SkinColor from '@/components/AvatarMaker/SkinColor.vue';

const colors = ["ffdbb4","edb98a","fd9841","fcee93","d08b5b","ae5d29","614335"];
const skins = ["ffdbb4","edb98a","fd9841","fcee93","d08b5b","ae5d29","614335"];
const eyes = ["default","dizzy","eyeroll","happy","close","hearts","side","wink","squint","surprised","winkwacky","cry"];
const eyebrows = ["default","default2","raised","sad","sad2","unibrow","updown","updown2","angry","angry2"];
const mouths = ["default","twinkle","tongue","smile","serious","scream","sad","grimace","eating","disbelief","concerned","vomit"];
const hairstyles = ["bold","longhair","longhairbob","hairbun","longhaircurly","longhaircurvy","longhairdread","nottoolong","miawallace","longhairstraight","longhairstraight2","shorthairdreads","shorthairdreads2","shorthairfrizzle","shorthairshaggy","shorthaircurly","shorthairflat","shorthairround","shorthairwaved","shorthairsides"];
const haircolors = ["bb7748_9a4f2b_6f2912","404040_262626_101010","c79d63_ab733e_844713","e1c68e_d0a964_b88339","906253_663d32_3b1d16","f8afaf_f48a8a_ed5e5e","f1e6cf_e9d8b6_dec393","d75324_c13215_a31608","59a0ff_3777ff_194bff"];
const facialhairs = ["none","magnum","fancy","magestic","light"];
const clothes = ["vneck","sweater","hoodie","overall","blazer"];
const fabriccolors = ["545454","65c9ff","5199e4","25557c","e6e6e6","929598","a7ffc4","ffdeb5","ffafb9","ffffb1","ff5c5c","e3adff"];
const backgroundcolors = ["ffffff","f5f6eb","e5fde2","d5effd","d1d0fc","f7d0fc","d0d0d0"];
const glasses = ["none","rambo","fancy","old","nerd","fancy2","harry"];
const glassopacities = ["10","25","50","75","100"];
const tattoos = ["non","harry","airbender","krilin","front","tribal","tribal2","throat"];
const accesories = ["none","earphones","earring1","earring2","earring3"];

let current_skincolor = "edb98a";
let current_hairstyle = "longhair";
let current_haircolor = "bb7748_9a4f2b_6f2912";
let current_fabriccolors = "545454";
let current_backgroundcolors = "ffffff";
let current_glassopacity = 0.5;

const selectedColor = ref(null);

function selectColor(color) {
  selectedColor.value = color;
}

$(document).ready(function() {
    $("body").delegate("#menu_list button","click",function() {
        var idx = $(this).attr("id");
        if (idx=="download") {
            var current_eyes;
            $("#eyes g").each(function() {
                if ($(this).css("display")=="inline") {
                    id = $(this).attr("id");
                    current_eyes = id.substr(2);
                }
            });
            var current_eyebrows;
            $("#eyebrows g").each(function() {
                if ($(this).css("display")=="inline") {
                    id = $(this).attr("id");
                    current_eyebrows = id.substr(3);
                }
            });
            var current_mouth;
            $("#mouths g").each(function() {
                if ($(this).css("display")=="inline") {
                    id = $(this).attr("id");
                    current_mouth = id.substr(2);
                }
            });
            var current_facialhair = "none";
            $("#facialhair g").each(function() {
                if ($(this).css("display")=="inline") {
                    id = $(this).attr("id");
                    current_facialhair = id.substr(2);
                }
            });
            var current_clothe;
            $("#clothes g").each(function() {
                if ($(this).css("display")=="inline") {
                    id = $(this).attr("id");
                    current_clothe = id.substr(2);
                }
            });
            var current_glasses = "none";
            $("#glasses g").each(function() {
                if ($(this).css("display")=="inline") {
                    id = $(this).attr("id");
                    current_glasses = id.substr(2);
                }
            });
            var current_tattoos = "none";
            $("#tattoos g").each(function() {
                if ($(this).css("display")=="inline") {
                    id = $(this).attr("id");
                    current_tattoos = id.substr(2);
                }
            });
            var current_accesories = "none";
            $("#accesories g").each(function() {
                if ($(this).css("display")=="inline") {
                    id = $(this).attr("id");
                    current_accesories = id.substr(2);
                }
            });
            var url = "https://vitruvianman.000webhostapp.com/avatarmaker/avatar.php?skincolor="+current_skincolor;
            url += "&hairstyle="+current_hairstyle;
            url += "&haircolor="+current_haircolor;
            url += "&fabriccolors="+current_fabriccolors;
            url += "&eyes="+current_eyes;
            url += "&eyebrows="+current_eyebrows;
            url += "&mouth="+current_mouth;
            url += "&facialhair="+current_facialhair;
            url += "&clothe="+current_clothe;
            url += "&backgroundcolor="+current_backgroundcolors;
            url += "&glasses="+current_glasses;
            url += "&glassopacity="+current_glassopacity;
            url += "&tattoos="+current_tattoos;
            url += "&accesories="+current_accesories;
            window.open(url);
        } else {
            var selected = $(this).html();
            $("#options_title").html("SELECT "+selected);
            $("#options_div").html("");
            var html = "";
            switch (idx) {
                case "skincolor":
                    for (var i=0; i < skins.length; i++) {
                        skin = skins[i];
                        html += "<div class='skins' id='s_"+skin+"' style='background-color:#"+skin+";'></div>";
                    }
                    break;
                case "eyes":
                    for (i=0;i<eyes.length; i++) {
                        eye = eyes[i];
                        html += "<div class='eyes' id='e_"+eye+"' style='background-color:#"+current_skincolor+";background-position:"+(i*-53)+"px 0px;'></div>";
                    }
                    break;
                case "eyebrows":
                    for (i=0;i<eyebrows.length; i++) {
                        eyebrow = eyebrows[i];
                        html += "<div class='eyebrows' id='eb_"+eyebrow+"' style='background-color:#"+current_skincolor+";background-position:"+(i*-53)+"px -53px;'></div>";
                    }
                    break;
                case "mouths":
                    for (i=0;i<mouths.length; i++) {
                        mouth = mouths[i];
                        html += "<div class='mouths' id='m_"+mouth+"' style='background-color:#"+current_skincolor+";background-position:"+(i*-53)+"px -106px;'></div>";
                    }
                    break;
                case "hairstyles":
                    for (i=0;i<hairstyles.length; i++) {
                        hairstyle = hairstyles[i];
                        html += "<div class='hairstyles' id='h_"+hairstyle+"' style='background-color:#ffffff;background-position:"+(i*-53)+"px -159px;'></div>";
                    }
                    break;
                case "haircolors":
                    for (i=0;i<haircolors.length; i++) {
                        haircolor = haircolors[i];
                        haircolor_front = haircolor.split("_");
                        html += "<div class='haircolors' id='hc_"+haircolor+"' style='background-color:#"+haircolor_front[0]+";'></div>";
                    }
                    break;
                case "facialhairs":
                    for (i=0;i<facialhairs.length; i++) {
                        facialhair = facialhairs[i];
                        haircolor_front = facialhair.split("_");
                        html += "<div class='facialhairs' id='f_"+facialhair+"' style='background-color:#ffffff;background-position:"+(i*-53)+"px -212px;'></div>";
                    }
                    break;
                case "clothes":
                    for (var i=0;i<clothes.length; i++) {
                        clothe = clothes[i];
                        html += "<div class='clothes' id='c_"+clothe+"' style='background-color:#ffffff;background-position:"+(i*-53)+"px -265px;'></div>";
                    }
                    break;
                case "fabriccolors":
                    for (var i=0;i<fabriccolors.length; i++) {
                        fabriccolor = fabriccolors[i];
                        html += "<div class='fabriccolors' id='f_"+fabriccolor+"' style='background-color:#"+fabriccolor+";'></div>";
                    }
                    break;
                case "backgroundcolors":
                    for (var i=0;i<backgroundcolors.length; i++) {
                        backgroundcolor = backgroundcolors[i];
                        html += "<div class='backgroundcolors' id='g_"+backgroundcolor+"' style='background-color:#"+backgroundcolor+";'></div>";
                    }
                    break;
                case "glasses":
                    for (var i=0;i<glasses.length; i++) {
                        glass = glasses[i];
                        html += "<div class='glasses' id='g_"+glass+"' style='background-color:#ffffff;background-position:"+(i*-53)+"px -313px;'></div>";
                    }
                    break;
                case "glassopacity":
                    for (var i=0;i<glassopacities.length; i++) {
                        glassopacity = glassopacities[i];
                        html += "<div class='glassopacity' id='o_"+glassopacity+"' style='background-color:#ffffff;'>"+glassopacity+"%</div>";
                    }
                    break;
                case "tattoos":
                    for (var i=0;i<tattoos.length; i++) {
                        tattoo = tattoos[i];
                        html += "<div class='tattoos' id='t_"+tattoo+"' style='background-color:#ffffff;background-position:"+(i*-53)+"px -419px;'></div>";
                    }
                    break;
                case "accesories":
                    for (var i=0;i<accesories.length; i++) {
                        accesory = accesories[i];
                        html += "<div class='accesories' id='a_"+accesory+"' style='background-color:#ffffff;background-position:"+(i*-53)+"px -369px;'></div>";
                    }
                    break;
            }
            $("#options_div").html(html);
            $("#menu_lines").click();
        }
    });
    $("body").delegate("#random","click",function() {
        random();
    });
    $("body").delegate("#menu_lines","click",function() {
        menu_class = $("#menu").attr("class");
        if (menu_class==="") {
            $("#menu").addClass("active");
            $("#menu").css({
                "border":"0px"
            });
            $("#menu").stop().animate({
                "width":"360px"
            },{
                duration:300,
                complete: function() {
                    $(this).stop().animate({
                        "height":"460px"
                    },{
                        duration:300,
                    });
                }
            });
        } else {
            $("#menu").removeClass("active");
            $("#menu").css({
                "border-right":"1px solid #707070"
            });
            $("#menu").stop().animate({
                "height":"99px"
            },{
                duration:300,
                complete: function() {
                    $(this).stop().animate({
                        "width":"60px"
                    },{
                        duration:300,
                    });
                }
            });
        }
    });
    $("body").delegate(".skins","click",function() {
        var id = $(this).attr("id");
        id = id.substr(2);
        current_skincolor = id;
        $("#skin #body").attr("fill","#"+id);
    });
    $("body").delegate(".eyes","click",function() {
        var id = $(this).attr("id");
        id = id.substr(2);
        $("#eyes g").hide();
        $("#eyes #e_"+id).show();
    });
    $("body").delegate(".eyebrows","click",function() {
        var id = $(this).attr("id");
        id = id.substr(3);
        $("#eyebrows g").hide();
        $("#eyebrows #eb_"+id).show();
    });
    $("body").delegate(".mouths","click",function() {
        var id = $(this).attr("id");
        id = id.substr(2);
        $("#mouths g").hide();
        $("#mouths #m_"+id).show();
    });
    $("body").delegate(".hairstyles","click",function() {
        var id = $(this).attr("id");
        id = id.substr(2);
        current_hairstyle = id;
        $("#hair_front g").hide();
        $("#hair_back g").hide();
        $("#hair_front .h_"+id).show();
        $("#hair_back .h_"+id).show();
        var color = current_haircolor;
        color = color.split("_");
        $("#hair_front .h_"+current_hairstyle+" .tinted").attr("fill","#"+color[0]);
        $("#hair_back .h_"+current_hairstyle+" .tinted").attr("fill","#"+color[1]);
        $("#facialhair g .tinted").attr("fill","#"+color[2]);
    });
    $("body").delegate(".haircolors","click",function() {
        var id = $(this).attr("id");
        id = id.substr(3);
        current_haircolor = id;
        id = id.split("_");
        $("#hair_front .h_"+current_hairstyle+" .tinted").attr("fill","#"+id[0]);
        $("#hair_back .h_"+current_hairstyle+" .tinted").attr("fill","#"+id[1]);
        $("#facialhair g .tinted").attr("fill","#"+id[2]);
    });
    $("body").delegate(".facialhairs","click",function() {
        var id = $(this).attr("id");
        id = id.substr(2);
        $("#facialhair g").hide();
        $("#facialhair #f_"+id).show();
    });
    $("body").delegate(".clothes","click",function() {
        var id = $(this).attr("id");
        id = id.substr(2);
        $("#clothes g").hide();
        $("#clothes #c_"+id).show();
    });
    $("body").delegate(".fabriccolors","click",function() {
        var id = $(this).attr("id");
        id = id.substr(2);
        current_fabriccolors = id;
        $("#clothes g .tinted").attr("fill","#"+id);
    });
    $("body").delegate(".backgroundcolors","click",function() {
        var id = $(this).attr("id");
        id = id.substr(2);
        current_backgroundcolors = id;
        $("#background").attr("fill","#"+id);
    });
    $("body").delegate(".glasses","click",function() {
        var id = $(this).attr("id");
        id = id.substr(2);
        $("#glasses g").hide();
        $("#glasses #g_"+id).show();
    });
    $("body").delegate(".glassopacity","click",function() {
        var id = $(this).attr("id");
        id = parseInt(id.substr(2));
        current_glassopacity = id/100;
        $(".glass").attr("fill-opacity",current_glassopacity);
    });
    $("body").delegate(".tattoos","click",function() {
        var id = $(this).attr("id");
        id = id.substr(2);
        $("#tattoos g").hide();
        $("#tattoos #t_"+id).show();
    });
    $("body").delegate(".accesories","click",function() {
        var id = $(this).attr("id");
        id = id.substr(2);
        $("#accesories g").hide();
        $("#accesories #a_"+id).show();
    });
    random();
})
function random() {
    const rand_skins = skins[Math.floor(Math.random() * skins.length)];
    const rand_eyes = eyes[Math.floor(Math.random()*eyes.length)];
    const rand_eyebrows = eyebrows[Math.floor(Math.random()*eyebrows.length)];
    const rand_mouths = mouths[Math.floor(Math.random()*mouths.length)];
    const rand_hairstyles = hairstyles[Math.floor(Math.random()*hairstyles.length)];
    const rand_haircolors = haircolors[Math.floor(Math.random()*haircolors.length)];
    const rand_facialhairs = facialhairs[Math.floor(Math.random()*facialhairs.length)];
    const rand_clothes = clothes[Math.floor(Math.random()*clothes.length)];
    const rand_fabriccolors = fabriccolors[Math.floor(Math.random()*fabriccolors.length)];
    const rand_backgroundcolors = backgroundcolors[Math.floor(Math.random()*backgroundcolors.length)];
    const rand_glasses = glasses[Math.floor(Math.random()*glasses.length)];
    const rand_glassopacities = parseInt(glassopacities[Math.floor(Math.random()*glassopacities.length)])/100;
    const rand_tattoos = tattoos[Math.floor(Math.random()*tattoos.length)];
    const rand_accesories = accesories[Math.floor(Math.random()*accesories.length)];

    current_skincolor = rand_skins;
    current_fabriccolors = rand_fabriccolors;
    current_backgroundcolors = rand_backgroundcolors;
    current_glassopacity = rand_glassopacities;

    $("#skin #body").attr("fill","#"+rand_skins);
    $("#eyes g").hide();
    $("#eyes #e_"+rand_eyes).show();
    $("#eyebrows g").hide();
    $("#eyebrows #eb_"+rand_eyebrows).show();
    $("#mouths g").hide();
    $("#mouths #m_"+rand_mouths).show();
    current_hairstyle = rand_hairstyles;
    $("#hair_front g").hide();
    $("#hair_back g").hide();
    $("#hair_front .h_"+rand_hairstyles).show();
    $("#hair_back .h_"+rand_hairstyles).show();
    current_haircolor = rand_haircolors;
    var color = current_haircolor;
    color = color.split("_");
    $("#hair_front .h_"+current_hairstyle+" .tinted").attr("fill","#"+color[0]);
    $("#hair_back .h_"+current_hairstyle+" .tinted").attr("fill","#"+color[1]);
    $("#facialhair g .tinted").attr("fill","#"+color[2]);
    $("#facialhair g").hide();
    $("#facialhair #f_"+rand_facialhairs).show();
    $("#clothes g").hide();
    $("#clothes #c_"+rand_clothes).show();
    $("#glasses g").hide();
    $("#glasses #g_"+rand_glasses).show();
    $(".glass").attr("fill-opacity",rand_glassopacities);
    $("#clothes g .tinted").attr("fill","#"+rand_fabriccolors);
    $("#background").attr("fill","#"+rand_backgroundcolors);
    $("#tattoos g").hide();
    $("#tattoos #t_"+rand_tattoos).show();
    $("#accesories g").hide();
    $("#accesories #a_"+rand_accesories).show();
}
</script>

<style lang="scss" scoped>
.avatar-maker {
  &_colors {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;

    &-item {
      display: inline-block;
      width: 25px;
      min-width: 25px;
      height: 25px;
      margin: 5px;
      border-radius: 50%;
      border: 1px solid #707070;
      cursor: pointer;
    }
  }
}

svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#avatar {
  position: relative;
  margin: auto;
  width: 250px;
  height: 460px;
}

#footer {
  position: absolute;
  top: 360px;
  left: 0;
  width: 361px;
  height: 99px;
  border-top: 1px solid #707070;
}

#menu {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 99px;
  background-color: #ffffff;
  border-right: 1px solid #707070;
  z-index: 200;
  overflow: hidden;
}

#menu_lines div {
  position: absolute;
  left: 10px;
  width: 40px;
  height: 7px;
  background-color: #707070;
  -webkit-transition: all 0.35s cubic-bezier(0.75, 0.25, 0.10, 0.95);
  transition: all 0.35s cubic-bezier(0.75, 0.25, 0.10, 0.95);
}

#menu.active #menu1 {
  top: 22px;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transition: all 0.5s cubic-bezier(0.75, 0.25, 0.10, 0.95);
  transition: all 0.5s cubic-bezier(0.75, 0.25, 0.10, 0.95);
}

#menu.active #menu2 {
  opacity: 0;
  -webkit-transition: opacity 0.5s cubic-bezier(0.75, 0.25, 0.10, 0.95);
  transition: opacity 0.5s cubic-bezier(0.75, 0.25, 0.10, 0.95);
}

#menu.active #menu3 {
  top: 22px;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transition: all 0.5s cubic-bezier(0.75, 0.25, 0.10, 0.95);
  transition: all 0.5s cubic-bezier(0.75, 0.25, 0.10, 0.95);
}

#options {
  position: absolute;
  top: 0;
  left: 61px;
  width: 299px;
  height: 99px;
}

#options_title {
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  padding-top: 8px;
}

#options_div {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  top: 34px;
  left: 0;
  width: 299px;
  height: 65px;
  overflow-y: hidden;
}

.skins,
.eyes,
.eyebrows,
.mouths,
.hairstyles,
.haircolors,
.facialhairs,
.clothes,
.fabriccolors,
.backgroundcolors,
.glasses,
.glassopacity,
.tattoos,
.accesories {
  flex: 0 0 auto;
  top: 0;
  width: 53px;
  height: 53px;
  margin: 5px;
  border: 1px solid #707070;
  cursor: pointer;
  border-radius: 10px;
  background-color: #ffdbb4;
}

.eyes,
.eyebrows,
.mouths,
.hairstyles,
.facialhairs,
.clothes,
.glasses,
.tattoos,
.accesories {
  background-image: url(https://i.imgur.com/q0DdlUI.png);
}

.glassopacity {
  text-align: center;
  font-size: 21px;
  font-weight: bold;
  height: 43px;
  padding-top: 10px;
  color: #707070;
}

#menu_list {
  position: absolute;
  bottom: 10px;
  left: 70px;
  width: 250px;
  height: auto;
  text-align: center;
}

.btn {
  padding: 8px;
  font-weight: bold;
  margin-bottom: 7px;
}

#menu_list div {
  width: 100%;
  cursor: pointer;
  padding: 7px 0 7px 0;
  font-size: 19px;
  font-weight: bold;
  color: #707070;
}
</style>