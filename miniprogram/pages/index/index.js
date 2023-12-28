// pages/index/index.js
// import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';

const semester = {
  2023: ['春','秋'],
  2022: ['春','秋'],
  2021: ['春','秋'],
  2020: ['春','秋'],
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    semesterAndCourseData: [
      {
        semesterId: 0,
        semesterName: '2023秋',
        courses: [
          {
            courseId: 0,
            courseName: '测试0',
            courseDesc: ''
          },
          {
            courseId: 1,
            courseName: '测试1',
            courseDesc: ''
          },
          {
            courseId: 2,
            courseName: '测试2',
            courseDesc: ''
          },
        ]
      },
      {
        semesterId: 1,
        semesterName: '2023春',
        courses: [
          {
            courseId: 0,
            courseName: '测试0',
            courseDesc: ''
          },
          {
            courseId: 1,
            courseName: '测试1',
            courseDesc: ''
          },
        ]
      },
    ],
    isTeacher:true,
    showSemester:false,
    showEditSemester:false,
    showRename:false,
    showAddCourse: false,
    courseDescInput:'',
    courseNameInput:'',
    semesterColumns: [
      {
        values: Object.keys(semester),
        className: 'year',
      },
      {
        values: semester[2023],
        className: 'season',
        defaultIndex: 0,
      },
    ],
    renameInput:'',
    curSemester:[],
    semesterKeyValue:[],
    isLoading:false
  },
  triggerIdentity(){
    this.setData({
      isTeacher:!this.data.isTeacher
    })
  },
  // 显示弹出层同时关闭TabBar
  createSemester() {
    wx.hideTabBar()
    this.setData({ showSemester: true });
  },
  // 控制弹出层的关闭同时显示TabBar
  onCloseSemester() {
    this.setData({ showSemester: false });
    wx.showTabBar()
    // console.log('关闭');
  },
  // 用户修改弹出层内学期
  onChangeSemester(event) {
    const { picker, value, index } = event.detail;
    // console.log(picker);
    // console.log(value);
    // console.log(index);
    // 随第一列的更新，第二列更新得到对应数据
    picker.setColumnValues(1, semester[value[0]]);
  },
  // picker取消按钮
  onCancelSemester() {
    this.onCloseSemester()
  },
  // picker确认按钮
  onConfirmSemester(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      semesterKeyValue:value
    })
    this.onCloseSemester()
  },
  // 编辑学期
  editSemester(event) {
    // console.log(event.target.dataset.sname);
    wx.hideTabBar()
    this.setData({ 
      showEditSemester: true,
      curSemester: [event.target.dataset.sid,event.target.dataset.sname]
     });
     
  },
  onCloseEditSemester() {
    this.setData({ showEditSemester: false });
    wx.showTabBar()
  },
  //删除学期 
  deleteSemester() {
    // 弹出确认框
    Dialog.confirm({
      title: '删除学期',
      message: '警告：该学期下的所有课程内容也将全部删除？',
    })
      .then(() => {
        // on confirm
        // 删除当前学期
        const newdata = this.data.semesterAndCourseData.filter((val)=>val.semesterId!=this.data.curSemester[0])
        this.setData({
          semesterAndCourseData:newdata
        })
        Toast.success('删除成功');
        this.onCloseEditSemester()
      })
      .catch(() => {
        // on cancel
      });
  },
  // 点击重命名
  renameFn() {
    this.onCloseEditSemester()
    this.setData({
      showRename:true
    })
  },
  // 关闭重命名弹出层
  onCloseRename() {
    this.setData({
      showRename:false,
      renameInput: ''
    })
  },
  // 输入rename文本框
  onRenameInput(event) {
    // console.log(event.detail.value);
    // 优化需要防抖(待实现)
    this.setData({
      renameInput: event.detail.value
    })
  },
  //确认重命名
  renameConfirm() {
    const curId = this.data.curSemester[0]
    // console.log(curId);
    const index = this.data.semesterAndCourseData.findIndex(ele=>ele.semesterId===curId)
    // console.log(index);
    this.setData({
      ['semesterAndCourseData['+index+'].semesterName']:this.data.renameInput,
      renameInput:'',
      showRename:false
    })
    Toast.success('操作成功');
  },
  // 关闭添加课程弹层
  onCloseAddCourse() {
    this.setData({
      showAddCourse:false,
      courseNameInput: '',
      courseDescInput: '',
    })
  },
  // 显示添加课程弹窗
  addCourse() {
    this.setData({
      showAddCourse:true,
      showEditSemester:false,
    })
  },
  // 随视图更新数据
  addcourseNameInput(e) {
    this.setData({
      courseNameInput:e.detail.value
    })
  },
  // 随视图更新数据
  addcourseDescInput(e) {
    this.setData({
      courseDescInput:e.detail.value
    })
  },
  //确认添加课程
  addcourseConfirm() {
    // {
    //   courseId: 2,
    //   courseName: '测试2',
    //   courseDesc: ''
    // }
    const curId = this.data.curSemester[0]
    const index = this.data.semesterAndCourseData.findIndex(ele=>ele.semesterId===curId)
    const temp = this.data.semesterAndCourseData[index].courses
    
    const newEle = {
      courseId: temp.length,
      courseName: this.data.courseNameInput,
      courseDesc: this.data.courseDescInput
    }
    // console.log(curId);
    // console.log(index);
    // console.log(temp);
    // console.log(newEle);
    this.setData({
      ['semesterAndCourseData['+index+'].courses']:[...temp,newEle],
      showAddCourse:false
    })
    Toast.success('操作成功');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: '首页',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
